import usersRoutes from "../routes/users.js";
import authRoutes from "../routes/auth.js";
import userProfileRoutes from "../routes/userProfile.js";

const routes = (app) => {
  // setup routes
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/userProfile", userProfileRoutes);
};

export default routes;
