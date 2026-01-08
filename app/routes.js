import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("/leaderboards", "./routes/leaderboards.jsx"),
  route("/steam-callback", "routes/steam-callback.jsx"),
  // route("/profile","routes/profile.jsx"),
  route("/profile/:steamId?", "routes/profile.jsx"),
  route("/store", "routes/store.jsx"),
  route("/map-voting", "routes/mapVote.jsx"),
  route("/success", "pages/Success.jsx"),

  route(
    ".well-known/appspecific/com.chrome.devtools.json",
    "routes/ignored.jsx"
  ),
];
