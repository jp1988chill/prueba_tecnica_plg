using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Prueba.Domain.Models
{
    public class ObtenerClienteModel
    {
        //Lógica Microservicio...
        public List<Cliente> ObtenerClientesPorStoredProcedure(IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository){
            var resp = clienteRepository.GetAllFromSP();
            return resp;
        }
        public async Task<ClienteResponse> ObtenerCliente(IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository)
        {
            int httpCod = 200;
            string httpMsg = "Registros Procesados Correctamente";
            string moreInfo = "200 - Success";
            string usrFriendlyErr = "Registros Procesados Correctamente";

            List<Cliente> clientes = ObtenerClientesPorStoredProcedure(clienteRepository);
            if (clientes == null) {
                httpCod = 400;
                httpMsg = "No existe(n) Cliente(s)";
                moreInfo = httpCod + " - Error";
                usrFriendlyErr = httpMsg;
            }

            ClienteResponse bodyResponse = new ClienteResponse()
            {
                HttpCode = httpCod,
                HttpMessage = httpMsg,
                MoreInformation = moreInfo,
                clienteFriendlyError = usrFriendlyErr,
                clientesNuevoTokenAsignado = clientes
            };
            await Task.CompletedTask.ConfigureAwait(false);
            return bodyResponse;
        }
    }
}
