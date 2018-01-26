import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull
} from "graphql";

import {
  videos,
  events,
  speakers,
  technologies,
  getSpeakerByName,
  getTechnologyByName,
  getEventByName,
  getVideosBySpeaker,
  getVideosByTechnology,
  getVideosByEvent
} from "./data";

var SpeakerType = new GraphQLObjectType({
  name: "speaker",
  fields: function() {
    return {
      name: {
        type: GraphQLString
      },
      fullName: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      },
      twitter: {
        type: GraphQLString
      },
      github: {
        type: GraphQLString
      },
      videos: {
        type: new GraphQLList(VideoType),
        resolve: ({ name }) => getVideosBySpeaker(name)
      }
    };
  }
});

var TechnologyType = new GraphQLObjectType({
  name: "technology",
  fields: function() {
    return {
      name: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      videos: {
        type: new GraphQLList(VideoType),
        resolve: ({ name }) => getVideosByTechnology(name)
      }
    };
  }
});

var EventType = new GraphQLObjectType({
  name: "event",
  fields: function() {
    return {
      name: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      website: {
        type: GraphQLString
      },
      logo: {
        type: GraphQLString
      },
      videos: {
        type: new GraphQLList(VideoType),
        resolve: ({ name }) => getVideosByEvent(name)
      }
    };
  }
});

var VideoType = new GraphQLObjectType({
  name: "video",
  fields: function() {
    return {
      name: {
        type: GraphQLString
      },
      speaker: {
        type: SpeakerType,
        resolve: ({ speaker }) => getSpeakerByName(speaker)
      },
      title: {
        type: GraphQLString
      },
      source: {
        type: GraphQLString
      },
      // date: new Date("Sep 17, 2017"),
      event: {
        type: EventType,
        resolve: ({ event }) => getEventByName(event)
      },
      duration: {
        type: GraphQLString
      },
      technologies: {
        type: new GraphQLList(TechnologyType),
        resolve: ({ technologies }) =>
          technologies.map(t => getTechnologyByName(t))
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      videos: {
        type: new GraphQLList(VideoType),
        resolve: function() {
          return videos;
        }
      },
      technology: {
        type: TechnologyType,
        args: {
          name: {
            description: "name of the technology",
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, { name }) => getTechnologyByName(name)
      },
      speaker: {
        type: SpeakerType,
        args: {
          name: {
            description: "name of the speaker",
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, { name }) => getSpeakerByName(name)
      },
      event: {
        type: EventType,
        resolve: function() {
          return events;
        },
        args: {
          name: {
            description: "name of the event",
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, { name }) => getEventByName(name)
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: queryType
});
