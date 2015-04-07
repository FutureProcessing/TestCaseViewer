#r "packages/FAKE.Core.3.26.7/tools/FakeLib.dll"

open Fake
open Fake.ProcessHelper
open System.Diagnostics

let packagesDir = "packages" |> FullName
let jsApp = "Web" @@ "app" |> FullName

let buildDir = ".." @@ "build" |> FullName

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

Target "BuildJs" (fun _ ->
    let gulpPath = jsApp @@ "node_modules" @@ ".bin" @@ "gulp.cmd"

    let npmParams (info:ProcessStartInfo) = 
        info.FileName <- "\"" + gulpPath + "\""       
        info.WorkingDirectory <- jsApp

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
                                Verbosity = Some(MSBuildVerbosity.Normal)
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
==> "BuildJs"
==> "BuildDotNet"
==> "Package"
==> "Build"
==> "Default"

RunTargetOrDefault "Default"