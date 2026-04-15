const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const Sensor = require('../models/Sensor');
const SensorReading = require('../models/SensorReading');

// const SensorType = new GraphQLObjectType({
//     name: 'Sensor',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         unit: { type: GraphQLString },
//         readings: {
//             type: new GraphQLList(SensorReadingType),
//             resolve(parent, args) {
//                 return [
//                     { id: 1545, time: Date.now(), value: 15 }
//                 ]
//             }
//         }
//     })
// })
const SensorType = new GraphQLObjectType({
    name: 'Sensor',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        unit: { type: GraphQLString },
        readings: {
            type: new GraphQLList(SensorReadingType),
            resolve(parent, args) {
                return [
                    { id: 1545, time: Date.now(), value: 15 }
                ]
            }
        }
    })
})

const SensorReadingType = new GraphQLObjectType({
    name: 'SensorReading',
    fields: () => ({
        _id: { type: GraphQLID },
        time: { type: GraphQLFloat },
        value: { type: GraphQLInt },
        // sensor: {
        //     type: SensorType,
        //     resolve(parent, args) {
        //         return { id: parent.sensor, name: 'Parent sensor', unit: 'Parent unit' }
        //     }
        // }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        sensor: {
            type: SensorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //
                return { id: args.id, name: 'Name', unit: 'Unit', sensor: 1212 }
            }
        },
        sensorReading: {
            type: SensorReadingType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return { id: args.id, time: Date.now(), value: 15 }
            }
        },
        sensors: {
            type: new GraphQLList(SensorType),
            resolve(parent, args) {
                return Sensor.find()
            }
        },
        sensorReadings: {
            type: new GraphQLList(SensorReadingType),
            args: {
                sensor: { type: GraphQLID },
                items: { type: GraphQLInt },
                gt: { type: GraphQLFloat },
                gte: { type: GraphQLFloat },
                lt: { type: GraphQLFloat },
                lte: { type: GraphQLFloat }
            },
            resolve(parent, { sensor, items, gt, gte, lt, lte }) {
                let aggregation = [
                    {
                        $match: {
                            $and: [
                                { sensor }
                            ]
                        }
                    },
                    { $sort: { 'time': -1 } },
                ];
                if (gt || gte || lt || lte) {
                    aggregation[0].$match.$and.push({ time: {} })
                    if (gt) aggregation[0].$match.$and[1].time.$gt = gt;
                    if (gte) aggregation[0].$match.$and[1].time.$gte = gte;
                    if (lt) aggregation[0].$match.$and[1].time.$lt = lt;
                    if (lte) aggregation[0].$match.$and[1].time.$lte = lte;
                }
                if (items) aggregation = [...aggregation, { $limit: items }]
                return SensorReading.manualAggregation(aggregation)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSensor: {
            type: SensorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                unit: { type: GraphQLString }
            },
            resolve(parent, args) {
                // add to db

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})