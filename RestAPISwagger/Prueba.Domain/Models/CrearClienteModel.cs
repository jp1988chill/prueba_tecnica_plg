using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;

namespace Prueba.Domain.Models
{
    public class CrearClienteModel
    {
        //Lógica Microservicio...
        public bool CrearClientes(List<Cliente> users, IRepositoryEntityFrameworkCQRS<Cliente> userRepository){
            userRepository.InsertMany(users);
            if (userRepository.Save() > 0) {
                return true;
            }
            return false;
        }
        public async Task<ClienteResponse> CrearCliente(ClienteBody objBodyObjectRequest, IRepositoryEntityFrameworkCQRS<Cliente> userRepository)
        {
            int httpCod = 200;
            string httpMsg = "Registros Procesados Correctamente";
            string moreInfo = "200 - Success";
            string usrFriendlyErr = "Registros Procesados Correctamente";

            if (CrearClientes(objBodyObjectRequest.Clientes, userRepository) != true) {
                httpCod = 400;
                httpMsg = "Error al ingresar tarjetas";
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
