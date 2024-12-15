using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;

namespace Prueba.Domain.Models
{
    public class ActualizarNombreClienteModel
    {
        //Lógica Microservicio...
        public bool ActualizarNombreClientes(string NombreUsuarioOriginal, string NombreUsuarioNuevo, IRepositoryEntityFrameworkCQRS<Cliente> userRepository){
            //Por cada registro, lo eliminamos de la BD, y creamos uno nuevo,
            List<Cliente> lstUsers = userRepository.GetAll().Where(id => id.Name == NombreUsuarioOriginal).ToList();
            if (lstUsers.Count > 0)
            {
                foreach (Cliente user in lstUsers)
                {
                    userRepository.Delete(user.Token);
                    userRepository.Save();

                    user.Name = NombreUsuarioNuevo;
                    userRepository.Insert(user);
                    userRepository.Save();
                }
            }
            return true;
        }
        public async Task<ClienteResponse> ActualizarNombreCliente(string NombreUsuarioOriginal, string NombreUsuarioNuevo, IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository)
        {
            int httpCod = 200;
            string httpMsg = "Nombre de Cliente actualizado desde ("+ NombreUsuarioOriginal + ") a (" + NombreUsuarioNuevo + ") Correctamente";
            string moreInfo = "200 - Success";
            string usrFriendlyErr = "Registros Procesados Correctamente";

            bool OperacionOK = ActualizarNombreClientes(NombreUsuarioOriginal, NombreUsuarioNuevo, clienteRepository);
            if (OperacionOK == false) {
                httpCod = 400;
                httpMsg = "No existe el Nombre de TarjetaHabiente:("+ NombreUsuarioOriginal + ")";
                moreInfo = httpCod + " - Error";
                usrFriendlyErr = httpMsg;
            }

            ClienteResponse bodyResponse = new ClienteResponse()
            {
                HttpCode = httpCod,
                HttpMessage = httpMsg,
                MoreInformation = moreInfo,
                clienteFriendlyError = usrFriendlyErr
            };
            await Task.CompletedTask.ConfigureAwait(false);
            return bodyResponse;
        }
    }
}
