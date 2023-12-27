const router = require("express").Router();
const {registerUser, loginUser} = require("../controller/auth");
const {updateUser, deleteUser, getallUsers, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getProfile} = require("../controller/user");
const { protect } = require("../guards/protectroutes");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/:id", protect, updateUser);

router.delete("/deleteUser/:id", protect, deleteUser);

router.get("/", getallUsers);

router.put("/sendFriendRequest/:id", protect, sendFriendRequest);

router.put("/acceptFriendRequest/:id", protect, acceptFriendRequest);

router.put("/rejectFriendRequest/:id", protect, rejectFriendRequest);

router.get("/profile/:id", protect, getProfile);

module.exports = router;