using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;

namespace Prueba.Domain.Models
{
    public class EliminarClienteModel
    {
        //Lógica Microservicio...
        public bool EliminarClientes(List<Cliente> users, IRepositoryEntityFrameworkCQRS<Cliente> userRepository){
            foreach (Cliente user in users)
            {
                Cliente thisUser = userRepository.Get().Where( it => it.Name == user.Name).FirstOrDefault();
                if ((thisUser != null) && (user.Name == thisUser.Name))
                {
                    userRepository.Delete(thisUser);
                }
            }
            if (userRepository.Save() > 0)
            {
                return true;
            }
            return false;
        }
        public async Task<ClienteResponse> EliminarCliente(ClienteBody objBodyObjectRequest, IRepositoryEntityFrameworkCQRS<Cliente> userRepository)
        {
            int httpCod = 200;
            string httpMsg = "Registros Procesados Correctamente";
            string moreInfo = "200 - Success";
            string usrFriendlyErr = "Registros Procesados Correctamente";

            if (EliminarClientes(objBodyObjectRequest.Clientes, userRepository) != true) {
                httpCod = 400;
                httpMsg = "Error al eliminar usuarios";
                moreInfo = httpCod + " - Error";
                usrFriendlyErr = httpMsg;
            }

            ClienteResponse bodyResponse = new ClienteResponse()
            {
                HttpCode = httpCod,
                HttpMessage = httpMsg,
                MoreInformation = moreInfo,
                clienteFriendlyError = usrFriendlyErr,
                clientesNuevoTokenAsignado = objBodyObjectRequest.Clientes
            };
            await Task.CompletedTask.ConfigureAwait(false);
            return bodyResponse;
        }
    }
}
