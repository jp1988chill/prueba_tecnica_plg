using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Prueba.Domain
{
    public class Cliente
    {
        public Cliente(string name, string password, string country, string phone, Guid token, string tokenleasetime)
        {
            this.Name = name;
            this.Password = password;
            this.Country = country;
            this.Phone = phone;
            this.Token = token;
            this.Tokenleasetime = tokenleasetime;
        }
        [Key]
        public Guid Token { get; set; }     //Token de usuario generado con duración de N minutos
        public string Name { get; set; }    
        public string Password { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Tokenleasetime { get; set; } //allows the token to last up to 10 minutes
    }

    public class ClienteResponse
    {
        public int HttpCode { get; set; }
        public string HttpMessage { get; set; }
        public string MoreInformation { get; set; }
        public string clienteFriendlyError { get; set; }
        public List<Cliente> clientesNuevoTokenAsignado { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class ClienteBody
    {
        public List<Cliente> Clientes { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}