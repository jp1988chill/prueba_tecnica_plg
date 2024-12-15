using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;

namespace Prueba.Domain.Models
{
    public class CrearTokenModel
    {
        //Lógica Microservicio...
        public List<Cliente> CrearTokenDesdeUsuarios(List<Cliente> users, IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository){
            List<Cliente> usersTokenGenerado = new List<Cliente>();
            foreach (Cliente user in users) {
                Cliente thisUser = clienteRepository.GetAll().Where(id => id.Name == user.Name).FirstOrDefault();
                if (thisUser != null)
                {
                    clienteRepository.Delete(thisUser);
                    clienteRepository.Save();
                }
                thisUser = new Cliente(user.Name, user.Password, user.Country, user.Phone, new Guid(), DateTime.Now.AddMinutes(10).ToString()); //10 minutes lease time
                clienteRepository.Insert(thisUser);
                clienteRepository.Save();
                usersTokenGenerado.Add(thisUser);
            }
            return usersTokenGenerado;
        }
        public async Task<TokenResponse> CrearToken(ClienteBody objBodyObjectRequest, IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository)
        {
            int httpCod = 200;
            string httpMsg = "Registros Procesados Correctamente";
            string moreInfo = "200 - Success";
            string usrFriendlyErr = "Registros Procesados Correctamente";
            List<Cliente> lstNuevosTokensPorUsuario = CrearTokenDesdeUsuarios(objBodyObjectRequest.Clientes, clienteRepository);
            if (lstNuevosTokensPorUsuario.Count == 0) {
                httpCod = 400;
                httpMsg = "Error al ingresar tokens. No se generó token alguno para usuario(s)";
                moreInfo = httpCod + " - Error";
                usrFriendlyErr = httpMsg;
            }

            TokenResponse bodyResponse = new TokenResponse()
            {
                HttpCode = httpCod,
                HttpMessage = httpMsg,
                MoreInformation = moreInfo,
                userFriendlyError = usrFriendlyErr,
                UsersNuevoTokenAsignado = lstNuevosTokensPorUsuario
            };
            await Task.CompletedTask.ConfigureAwait(false);
            return bodyResponse;
        }
    }
}
