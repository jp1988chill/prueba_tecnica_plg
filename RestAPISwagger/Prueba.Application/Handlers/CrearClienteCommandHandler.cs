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
    public class CrearClienteCommandHandler : IRequestHandler<CrearClienteCommand, ClienteResponse>
    {
        private IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository = null;
        public CrearClienteCommandHandler(PruebaContext pruebaContext)
        {
            clienteRepository = new RepositoryEntityFrameworkCQRS<Cliente>(pruebaContext);

            //Mapear y crear BD desde Modelo EF Core a base de datos real, si no existe. (Requerido por EF Core)
            // Drop the database if it exists
            //pruebaContext.Database.EnsureDeleted();

            // Create the database if it doesn't exist
            pruebaContext.Database.EnsureCreated();
        }

        public async Task<ClienteResponse> Handle(CrearClienteCommand request, CancellationToken cancellationToken)
        {
            var middleWareHandler = new CrearClienteModel();
            var middleWareHandlerResponse = (await middleWareHandler.CrearCliente(request.objBodyObjectRequest, clienteRepository));
            return middleWareHandlerResponse;
        }
    }
}
