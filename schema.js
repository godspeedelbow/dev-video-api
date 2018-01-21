import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} from "graphql";

import {
  videos,
  events,
  speakers,
  technologies,
  getSpeakerByName,
  getTechnologyByName,
  getEventByName
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
      technologies: {
        type: new GraphQLList(TechnologyType),
        resolve: function() {
          return technologies;
        }
      },
      speakers: {
        type: new GraphQLList(SpeakerType),
        resolve: function() {
          return speakers;
        }
      },
      events: {
        type: new GraphQLList(EventType),
        resolve: function() {
          return events;
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: queryType
});
