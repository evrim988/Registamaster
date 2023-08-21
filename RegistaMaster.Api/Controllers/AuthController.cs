using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RegistaMaster.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    //Gizli Anahtar en az 128 bit (16 byte), 

    [HttpGet]
    public string Get(string username, string password)
    {
        var claims = new[]
        {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Email, username)
            };
        var signingKey = _configuration["JwtConfig:SigningKey"];

        //Kriptolama işlemi yapıldı
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        //Örneğin, AES-GCM veya RSA gibi diğer güvenli algoritmaları değerlendirebilirsiniz
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        //issuer token'ı veren kuruluş
        //audiens katılımcı
        //claim verilerin tutulduğu örn. kullanıcı rolü
        //expires token'ın geçersiz olacağı tarih
        //notBefore geçerliliğin başlayacağı tarih
        var issur = _configuration["JwtConfig:Issuer"];
        var audience = _configuration["JwtConfig:Audience"];
        //AppSettings'e yazacağız oradan alacağız bu bilgileri
        var jwtSecurityToken = new JwtSecurityToken(
            issuer: issur,
            audience: audience,
            claims: claims,
            expires: DateTime.Now.AddDays(15),
            notBefore: DateTime.Now,
            signingCredentials: credentials
            );

        var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        //kullanıcıya token kaydedilecek
        return token;
    }
    [HttpGet("ValidateToken")]
    public bool ValidateToken(string token)
    {
        var signingKey = _configuration["JwtConfig:SigningKey"];

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        try
        {
            JwtSecurityTokenHandler handler = new();
            handler.ValidateToken(token, new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securityKey,
                ValidateLifetime = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken); ;
            var jwtToken = (JwtSecurityToken)validatedToken;
            var claims = jwtToken.Claims.ToList();
            return true;
        }
        catch (Exception)
        {

            return false;
        }
    }


}
