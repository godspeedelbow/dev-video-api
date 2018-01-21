import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";

const technologies = [
  { name: "immutable-js", title: "ImmutableJS" },
  { name: "redux", title: "Redux" },
  { name: "relay", title: "Relay" },
  { name: "graphql", title: "GraphQL" },
  { name: "react", title: "React" },
  { name: "hoc", title: "HoC" },
  { name: "recompose", title: "Recompose" }
];

const events = [
  {
    name: "render-2016",
    title: "Render 2016",
    website: "http://2016.render-conf.com/",
    logo: "http://2016.render-conf.com/img/Render_logo_Colour.png"
  },
  {
    name: "react-europe-2015",
    title: "React Europe 2015",
    website: "https://2015.react-europe.org/",
    logo: "https://2015.react-europe.org/images/reacteurope.png"
  },
  {
    name: "react-europe-2016",
    title: "React Europe 2016",
    website: "https://2016.react-europe.org/",
    logo: "https://2016.react-europe.org/images/reacteurope%20.png"
  },
  {
    name: "react-europe-2017",
    title: "React Europe 2017",
    website: "https://2017.react-europe.org/",
    logo: "https://www.react-europe.org/images/reacteurope.png"
  },
  {
    name: "phoenix-react-js",
    title: "Phoenix ReactJS"
  }
];

const speakers = [
  {
    name: "lee-byron",
    fullName: "Lee Byron",
    image:
      "https://pbs.twimg.com/profile_images/826651806696501248/TOro78hz_400x400.jpg",
    twitter: "https://twitter.com/leeb",
    github: "https://github.com/leeb"
  },
  {
    name: "dan-abramov",
    fullName: "Dan Abramov",
    image:
      "https://pbs.twimg.com/profile_images/906557353549598720/oapgW_Fp_400x400.jpg",
    twitter: "https://twitter.com/dan_abramov",
    github: "https://github.com/gaearon"
  },
  {
    name: "michael-jackson",
    fullName: "Michael Jackson",
    image: "https://avatars1.githubusercontent.com/u/92839?s=400&v=4",
    twitter: "https://twitter.com/mjackson",
    github: "https://github.com/mjackson"
  }
];

const videos = [
  {
    name: "michael-jackson-never-write-another-hoc",
    speaker: "michael-jackson",
    title: "Never Write Another Hoc",
    date: new Date("Sep 17, 2017"),
    event: "phoenix-react-js",
    source: {
      origin: "youtube",
      url: "https://www.youtube.com/watch?v=BcVAq3YFiuc"
    },
    duration: "51:06",
    technologies: ["hoc", "recompose", "react"]
  },
  {
    name: "lee-byron-relay-modern",
    speaker: "lee-byron",
    title: "Relay Modern",
    date: new Date("24 May, 2017"),
    event: "react-europe-2017",
    source: {
      origin: "youtube",
      url: "https://www.youtube.com/watch?v=OdsMz7h_Li0"
    },
    duration: "27:32",
    technologies: ["relay", "graphql", "react"]
  },
  {
    name: "dan-abramov-the-redux-journey",
    speaker: "dan-abramov",
    title: "The Redux Journey",
    date: new Date("Jun 4, 2016"),
    event: "react-europe-2016",
    source: {
      origin: "youtube",
      url: "https://www.youtube.com/watch?v=uvAXVMwHJXU"
    },
    duration: "25:56",
    technologies: ["redux", "react"]
  },
  {
    name: "lee-byron-immutable-user-interfaces",
    speaker: "lee-byron",
    title: "Immutable User Interfaces",
    description:
      "One of the greatest challenges of building a rich UI is keeping track of all that is changing: incoming touch and mouse events, new data from your servers, animations, and more. Here we propose a new way to tackle this challenge that is as old as computing itself: don’t let anything change in the first place.\nCome learn about how to build rich and highly performant UIs without losing your sanity by leveraging immutable data and the optimization techniques it enables.",
    date: new Date("22 April, 2016"),
    event: "render-2016",
    source: {
      origin: "vimeo",
      url: "https://vimeo.com/166790294"
    },
    duration: "29:34",
    technologies: ["immutable-js", "react"]
  },
  {
    name: "dan-abramov-live-react-hot-reloading-with-time-travel",
    speaker: "dan-abramov",
    title: "Live React: Hot Reloading with Time Travel",
    date: new Date("Jul 5, 2015"),
    event: "react-europe-2015",
    source: {
      origin: "youtube",
      url: "https://www.youtube.com/watch?v=xsSnOQynTHs"
    },
    duration: "30:40",
    technologies: ["redux", "react"]
  }
];

const videosBySpeaker = groupBy(videos, "speaker");
const videosByEvent = groupBy(videos, "event");
const videosByTech = videos.reduce(
  (agg, video) => ({
    ...agg,
    ...video.technologies.reduce(
      (_agg, tech) => ({
        ..._agg,
        [tech]: [...(agg[tech] || []), video]
      }),
      {}
    )
  }),
  {}
);

const videosByName = keyBy(videos, "name");
const technologiesByName = keyBy(technologies, "name");
const speakersByName = keyBy(speakers, "name");
const eventsByName = keyBy(events, "name");

export { technologies, events, speakers, videos };
export const getSpeakerByName = name => speakersByName[name];
export const getEventByName = name => eventsByName[name];
export const getTechnologyByName = name => technologiesByName[name];
export const getVideosBySpeaker = speaker => videosBySpeaker[speaker];
export const getVideosByEvent = event => videosByEvent[event];
export const getVideosByTech = tech => videosByTech[tech];
