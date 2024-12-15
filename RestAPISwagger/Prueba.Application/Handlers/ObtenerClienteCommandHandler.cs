using MediatR;
using Prueba.Application.Commands;
using Prueba.Domain;
using Prueba.Domain.Models;
using Prueba.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Prueba.Application.Handlers
{
    public class ObtenerClienteCommandHandler : IRequestHandler<ObtenerClienteCommand, ClienteResponse>
    {
        private IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository = null;
        public ObtenerClienteCommandHandler(PruebaContext pruebaContext)
        {
            clienteRepository = new RepositoryEntityFrameworkCQRS<Cliente>(pruebaContext);

            //Mapear y crear BD desde Modelo EF Core a base de datos real, si no existe. (Requerido por EF Core)
            // Drop the database if it exists
            //pruebaContext.Database.EnsureDeleted();

            // Create the database if it doesn't exist
            pruebaContext.Database.EnsureCreated();
        }

        public async Task<ClienteResponse> Handle(ObtenerClienteCommand request, CancellationToken cancellationToken)
        {
            var middleWareHandler = new ObtenerClienteModel();
            var middleWareHandlerResponse = (await middleWareHandler.ObtenerCliente(clienteRepository));
            return middleWareHandlerResponse;
        }
    }
}
