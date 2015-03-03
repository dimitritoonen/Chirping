﻿#region using directives

using Microsoft.AspNet.Identity.EntityFramework;

using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Common.Data.Entities
{
    [Table("User")]
    public class UserAccountEntity : IdentityUser
    {
        [Required]
        public ProfileEntity Profile { get; set; }

        [DefaultValue(true)]
        public bool Active { get; set; }
    }
}
