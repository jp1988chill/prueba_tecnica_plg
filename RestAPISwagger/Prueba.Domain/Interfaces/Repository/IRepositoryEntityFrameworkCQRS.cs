﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Prueba.Domain
{
    public interface IRepositoryEntityFrameworkCQRS<TEntity>
    {
        void Delete(object id);
        void Delete(TEntity entityToDelete);
        IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "");
        TEntity GetByID(object id);
        IEnumerable<TEntity> GetAll();
        void Insert(TEntity entity);
        void InsertMany(List<TEntity> entity);
        void Update(TEntity entityToUpdate);
        int Save();
        DbContext GetDBContext();
        List<TEntity> GetAllFromSP();
    }
}
