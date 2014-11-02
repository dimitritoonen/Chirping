﻿#region using directives

using AutoMapper;

using Catch.Web.Api.Common.TypeMapping;
using Catch.Web.Api.Models;

#endregion

namespace Catch.Web.Api.AutoMappingConfiguration
{
    public class UserToNewUserAutoMapperTypeConfigurator
        : IAutoMapperTypeConfigurator
    {
        public void Configure()
        {
            Mapper.CreateMap<Domain.User, NewUser>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.GetName()));
        }
    }
}