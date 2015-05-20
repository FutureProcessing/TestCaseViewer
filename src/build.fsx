#r "packages/FAKE.Core.3.26.7/tools/FakeLib.dll"
#r "packages/GitVersion/lib/Net45/GitVersionCore.dll"
#r "packages/LibGit2Sharp/lib/net40/LibGit2Sharp.dll"

open Fake
open Fake.ProcessHelper
open Fake.AssemblyInfoFile
open System.Diagnostics

let packagesDir = "packages" |> FullName
let jsApp = "Web" @@ "app" |> FullName

let buildDir = ".." @@ "build" |> FullName

let nullable (value:'a) = new System.Nullable<'a>(value)

Target "Default" (fun _ ->    
    DoNothing()
)

Target "Clean" (fun _ ->
    let setParams defaults = { defaults with
                                Verbosity = Some(MSBuildVerbosity.Minimal)
                                Targets = ["Clean"]                                
                                Properties = [                                             
                                             "Configuration", "Release"
                                ]                                
    }

    build setParams "TestCaseViewer.sln" |> DoNothing
)

Target "Prepare" (fun _ ->
    CreateDir buildDir
)

Target "RestoreNuGetPackages" (fun _ ->
    "TestCaseViewer.sln" 
        |> RestoreMSSolutionPackages(fun p-> {p with
                                                ToolPath = FileSystem.findToolInSubPath "NuGet.exe"  packagesDir  
                                             }
                                    )
)

Target "RestoreNpmPackages" (fun _ ->
    let nodePath = @"C:\Program Files\nodejs"
    let npmPath = nodePath @@ "npm.cmd"

    let npmParams (info:ProcessStartInfo) = 
        info.FileName <- "\"" + npmPath + "\""
        info.Arguments <- "install"
        info.WorkingDirectory <- jsApp

    let result = directExec npmParams

    if result <> true  then failwithf "npm failed with non-zero exit code"
)


Target "BuildVersionInfo" (fun _ ->    
    GitVersion.Logger.WriteError <- new System.Action<string>(fun m-> failwith m)
    GitVersion.Logger.WriteInfo <- new System.Action<string>(fun m-> log m)
    GitVersion.Logger.WriteWarning <- new System.Action<string>(fun m-> log m)

    let repo = new LibGit2Sharp.Repository("..")

    let devConfig = new GitVersion.BranchConfig()
    devConfig.Increment <- (GitVersion.IncrementStrategy.Minor |> nullable)    
    devConfig.VersioningMode <- (GitVersion.VersioningMode.ContinuousDelivery |> nullable)

    let config = new GitVersion.Config()
    config.AssemblyVersioningScheme <- GitVersion.AssemblyVersioningScheme.MajorMinorPatch
    config.Branches.Add("dev", devConfig)        
    config.Branches.Add("origin/dev", devConfig)   
   
    let finder = new GitVersion.GitVersionFinder()    
    
    let useTrackingBranch = buildServer <> BuildServer.LocalBuild

    let context = new GitVersion.GitVersionContext(repo, config, useTrackingBranch)           

    let version = finder.FindVersion(context)

    logf "Version %A\n" version
     
    CreateCSharpAssemblyInfo ("ProjectAssemblyInfo.cs" |> FullName) [
            Attribute.Title "Test Case Viewer"
            Attribute.Product "Test Case Viewer"
            Attribute.Copyright "Future Processing"
            Attribute.Version (version.ToString())
            Attribute.FileVersion (version.ToString())
            Attribute.Metadata("git-hash", version.BuildMetaData.Sha)
            Attribute.Metadata("git-branch", version.BuildMetaData.Branch)
            Attribute.Metadata("built-at", System.DateTime.Now.ToString("o"))
        ]    
)

Target "BuildJs" (fun _ ->
    let gulpPath = jsApp @@ "node_modules" @@ ".bin" @@ "gulp.cmd"

    let npmParams (info:ProcessStartInfo) = 
        info.FileName <- "\"" + gulpPath + "\""       
        info.WorkingDirectory <- jsApp
        info.Arguments <- "--noToasts"

    let result = directExec npmParams

    if result <> true  then failwithf "gulp failed with non-zero exit code"
)

Target "BuildDotNet" (fun _ ->        
    let setParams defaults = { defaults with
                                Verbosity = Some(MSBuildVerbosity.Minimal)
                                Targets = ["Build"]                                
                                Properties = [                                             
                                             "Configuration", "Release"                                             
                                ]                                
    }

    build setParams "TestCaseViewer.sln" |> DoNothing
)

Target "Package" (fun _ ->
    let setParams defaults = { defaults with
                                Verbosity = Some(MSBuildVerbosity.Minimal)
                                Targets = ["Package"]                                
                                Properties = [                                             
                                             "Configuration", "Release"
                                             "PackageLocation", buildDir @@ "TestCaseViewer.zip"
                                             "VisualStudioVersion", "12.0"
                                ]                                
    }

    build setParams @"Web\Web.csproj" |> DoNothing
)

Target "Build" DoNothing



"Clean"
==> "Prepare"
==> "RestoreNuGetPackages"   
==> "RestoreNpmPackages"
==> "BuildVersionInfo"
==> "BuildJs"
==> "BuildDotNet"
==> "Package"
==> "Build"
==> "Default"

RunTargetOrDefault "Default"