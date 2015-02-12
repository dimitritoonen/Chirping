﻿#region using directives

using System;
using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace Chirping.Web.Api.Data.Entities
{
    public class Profile
    {
        public Guid Id { get; set; }

        [IndexAttribute(IsUnique=true)]
        public string NickName { get; set; }

        public string Age { get; set; }

        public string Gender { get; set; }

        public string City { get; set; }

        public string InterestedIn { get; set; }

        public string ProfileImage { get; set; }
    }
}