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
    public class CrearTokenCommandHandler : IRequestHandler<CrearTokenCommand, TokenResponse>
    {
        private IRepositoryEntityFrameworkCQRS<Cliente> clienteRepository = null;
        public CrearTokenCommandHandler(PruebaContext pruebaContext)
        {
            clienteRepository = new RepositoryEntityFrameworkCQRS<Cliente>(pruebaContext);

            //Mapear y crear BD desde Modelo EF Core a base de datos real, si no existe. (Requerido por EF Core)
            // Drop the database if it exists
            //pruebaContext.Database.EnsureDeleted();

            // Create the database if it doesn't exist
            pruebaContext.Database.EnsureCreated();
        }

        public async Task<TokenResponse> Handle(CrearTokenCommand request, CancellationToken cancellationToken)
        {
            var middleWareHandler = new CrearTokenModel();
            var middleWareHandlerResponse = (await middleWareHandler.CrearToken(request.objBodyObjectRequest, clienteRepository));
            return middleWareHandlerResponse;
        }
    }
}
