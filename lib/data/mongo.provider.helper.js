(function (providerHelper) {

    'use strict';

    var Promise = require("bluebird"),
        join = Promise.join;

    providerHelper.save = function (newModelData) {

        return new Promise(function (resolve, reject) {
            return newModelData.save(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    providerHelper.bulkInsert = function (Model, bulkData) {
        return new Promise(function (resolve, reject) {
            Model.insertMany(bulkData, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    providerHelper.findOne = function (Model, queryOpts, documentFields) {
        return Model.findOneAsync(queryOpts, documentFields);
    };
    providerHelper.find = function (Model, queryOpts) {
        return Model.findAsync(queryOpts);
    };

    providerHelper.findById = function (Model, queryOpts, documentFields) {
        return Model.findByIdAsync(queryOpts, documentFields);
    };

    providerHelper.getAllWithDocumentFieldsPagination = function (Model, queryOpts, pagerOpts, documentFields, sortOpts) {

        return join(Model
            .find(queryOpts)
            .select(documentFields)
            .skip(pagerOpts.perPage * (pagerOpts.page-1))
            .limit(pagerOpts.perPage)
            .sort( sortOpts )
            .execAsync(), Model.count(queryOpts).execAsync(),
            function (dataList, count) {
                return {
                    dataList:dataList,
                    totalItems:count,
                    currentPage:pagerOpts.page
                };
            });
    };

    providerHelper.getAllWithoutDocumentFieldsPagination = function (Model, queryOpts, pagerOpts) {

        return join(Model
            .find(queryOpts)
            .skip(pagerOpts.perPage * (pagerOpts.page-1))
            .limit(pagerOpts.perPage)
            .sort({ addedOn: 'desc' })
            .execAsync(), Model.count(queryOpts).execAsync(),
            function (dataList, count) {
                return {
                    dataList:dataList,
                    totalItems:count,
                    currentPage:pagerOpts.page
                };
            });
    };

    providerHelper.getAllWithDocumentFieldsNoPagination = function (Model, queryOpts, documentFields, sortField) {
        return Model
            .find(queryOpts)
            .select(documentFields)
            .sort(sortField)
            .execAsync();
    };

    providerHelper.getLatestData = function (Model, queryOpts, documentFields, sortOpts, limitOpts) {
        return Model
            .find(queryOpts)
            .select(documentFields)
            .sort(sortOpts)
            .limit(limitOpts)
            .execAsync();
    };


    providerHelper.getAllWithoutDocumentFieldsNoPagination = function (Model, queryOpts) {
        return Model
            .find(queryOpts)
            .sort({ addedOn: -1 })
            .execAsync();
    };

    providerHelper.getAllWithFieldsPaginationPopulation = function (Model, queryOpts, pagerOpts, documentFields, populationPath, populationFields, populationQueryOpts) {

        return join(Model.find(queryOpts)
            .select(documentFields)
            .populate({
                path: populationPath,
                match: populationQueryOpts,
                select: populationFields
            })
            .skip(pagerOpts.perPage * (pagerOpts.page-1))
            .limit(pagerOpts.perPage)
            .sort({ addedOn: -1 })
            .execAsync(), Model.count(queryOpts).execAsync(),
            function (dataList, count) {
                return {
                    dataList:dataList,
                    totalItems:count,
                    currentPage:pagerOpts.page
                };
            });
    };

    providerHelper.getAllWithFieldsPaginationMultiPopulation = function (Model, queryOpts, pagerOpts, documentFields, firstPopulation, secondPopulation, firstPopulationFields, populationQueryOpts, secondPopulationFields) {

        return join(Model.find(queryOpts)
                .populate({
                    path: firstPopulation,
                    match: populationQueryOpts,
                    select: firstPopulationFields
                })
                .populate({
                    path: secondPopulation,
                    select: secondPopulationFields
                })
                .select(documentFields)
                .skip(pagerOpts.perPage * (pagerOpts.page-1))
                .limit(pagerOpts.perPage)
                .sort({ addedOn: -1 })
                .execAsync(), Model.count(queryOpts).execAsync(),
            function (dataList, count) {
                return {
                    dataList:dataList,
                    totalItems:count,
                    currentPage:pagerOpts.page
                };
            });
    };

    providerHelper.getAllWithoutFieldsPaginationMultiPopulation = function (Model, queryOpts, documentFields, firstPopulation, secondPopulation, firstPopulationFields, populationQueryOpts, secondPopulationFields) {

        return Model.find(queryOpts)
                .populate({
                    path: firstPopulation,
                    match: populationQueryOpts,
                    select: firstPopulationFields
                })
                .populate({
                    path: secondPopulation,
                    select: secondPopulationFields
                })
                .select(documentFields)
                .sort({ addedOn: -1 })
                .execAsync();
    };

    providerHelper.getAllWithFieldsPopulation = function (Model, queryOpts, documentFields, populationPath, populationFields, populationQueryOpts, sortOpts) {
        return Model.find(queryOpts)
            .select(documentFields)
            .populate({
                path: populationPath,
                match: populationQueryOpts,
                select: populationFields,
                options: { sort: sortOpts }

            })
            .execAsync();
    };

    providerHelper.getByIdWithPopulation = function (Model, queryOpts, populationPath, populationQueryOpts, sortOpts, populationFields, documentFields) {
        return Model.findById(queryOpts)
            .select(documentFields)
            .populate({
                path: populationPath,
                match: populationQueryOpts,
                select: populationFields,
                options: { sort: sortOpts }
            })
            .execAsync();
    };

    providerHelper.getByIdWithMultiplePopulation = function (Model, queryOpts, firstPopulation, secondPopulation, documentFields, firstPopulationField, secondPopulationField) {
        return Model.findById(queryOpts)
            .select(documentFields)
            .populate({
                path: firstPopulation,
                select: firstPopulationField
            })
            .populate({
                path: secondPopulation,
                select: secondPopulationField
            })
            .execAsync();
    };

    providerHelper.checkForDuplicateEntry=function (Model, queryOpts) {
        return Model.count(queryOpts)
            .execAsync();
    };

    providerHelper.getDistinctValuesInArray = function (Model, queryfield, queryOpts) {
        return Model.distinct(queryfield, queryOpts)
            .execAsync();
    };

    providerHelper.removeModelData = function (Model, queryOpts) {
        return Model.remove(queryOpts)
            .execAsync();
    };

    providerHelper.saveModelToEmbeddedDocument = function (Model, embeddedDocChildSchema, parentId) {
        return Model.findByIdAndUpdate(
            parentId,
            {
                $push: embeddedDocChildSchema
            },
            {
                safe: true,
                upsert: true,
                new : true
            })
            .execAsync();
    };

    providerHelper.getAllEmbeddedDocumentsWithDocumentFieldsPagination = function (Model, queryOpts, pagerOpts, documentFields, sortParam, groupOpts, countProjectFields, unWindField) {

        return join( Model.aggregate([
            {
                $unwind:unWindField
            },
            {
                $match:queryOpts
            },{
                $project:documentFields
            },
            {
                $sort:sortParam
            },{
                $skip:pagerOpts.perPage * (pagerOpts.page-1)
            },{
                $limit:pagerOpts.perPage
            },{
                $group:groupOpts
            }]
            ).execAsync(), Model.aggregate([
            {
                $match:queryOpts
            },
            {
                $project:countProjectFields
            }]
            ).execAsync(),
            function (dataList, lstCount) {
                var _totalItems = 0;
                if(lstCount.length > 0){
                    _totalItems = lstCount[0].count;
                }
                return {
                    dataList:dataList,
                    totalItems:_totalItems,
                    currentPage:pagerOpts.page
                };
            });
    };


    providerHelper.getEmbeddedDocumentsWithoutPagination = function (Model, queryOpts, documentFields, unWindField, sortParam, groupOpts) {

        return Model.aggregate([
            {
                $unwind:unWindField
            },
            {
                $match:queryOpts
            },
            {
                $sort:sortParam
            },{
                $project:documentFields
            },{
                $group:groupOpts
            }]
        ).execAsync();

    };


    providerHelper.removeEmbeddedDocument = function (Model, embeddedDocChildSchema, parentId) {
        return Model.findByIdAndUpdate(
            parentId,
            {
                $pull: embeddedDocChildSchema
            },
            {
                safe: true,
                upsert: true,
                new : true
            })
            .execAsync();
    };



    providerHelper.updateModelData = function (Model, queryOpts, updateOpts, multiOpts) {
        return Model.update(queryOpts, updateOpts, {multi: multiOpts})
            .execAsync();
    };

    providerHelper.findByIdAndUpdate = function (Model, _parentId, pushSchema) {
        return Model.findByIdAndUpdate(
            _parentId,
            {
                $push: pushSchema
            },
            {
                safe: true,
                upsert: true,
                new : true
            })
            .execAsync();
    };

})(module.exports);