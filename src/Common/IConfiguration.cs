﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public interface IConfiguration
    {
        Uri TfsServer { get; }
        string ProjectName { get; }

        IDictionary<string, object> AcceptTransition { get; }
        IDictionary<string, object> RejectTransition { get; }
    }
}
