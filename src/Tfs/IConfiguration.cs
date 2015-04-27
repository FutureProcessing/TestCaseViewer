using System;
using System.Collections.Generic;
using Tfs.Matching;

namespace Tfs
{
    public interface IConfiguration
    {
        Uri TfsServer { get; }
        string ProjectName { get; }

        IDictionary<string, string> AcceptTransition { get; }
        IDictionary<string, string> RejectTransition { get; }
        MatchingSpec DesignStatus { get; }
        MatchingSpec WaitingForApprovalStatus { get; }
        MatchingSpec ReadyStatus { get; }
        string DefaultQuery { get; }
    }
}
