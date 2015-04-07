#r "packages/FAKE.Core.3.26.7/tools/FakeLib.dll"

open Fake

let packagesDir = "packages" |> FullName

Target "Default" (fun _ ->    
    DoNothing()
)

Target "Clean" (fun _ ->
    DoNothing()
)

Target "Build" (fun _ ->    
    "TestCaseViewer.sln" 
        |> RestoreMSSolutionPackages(fun p-> {p with
                                                ToolPath = FileSystem.findToolInSubPath "NuGet.exe"  packagesDir  
                                             }
                                    )


)

"Clean"
==> "Build"
==> "Default"

RunTargetOrDefault "Default"