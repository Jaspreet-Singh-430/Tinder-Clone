import User from "../models/user.js";
export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user._id);
        const likeduser = await User.findById(likedUserId);
        if(!likeduser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        if (!currentUser.likes.includes(likedUserId)) {
            currentUser.likes.push(likedUserId);
            await currentUser.save();
            //send notification if it is a match
            if (likeduser.likes.includes(req.user._id)) {
                currentUser.matches.push(likedUserId);
                likeduser.matches.push(req.user._id);
                await Promise.all([
                await currentUser.save(),
                await likeduser.save()]);
                // Here you can also implement a notification system to notify both users of the match
            }
        }
        res.status(200).json({
            success: true,
            user: currentUser,
            
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error liking user"
        })
    }
};
export const swipeLeft = async (req, res) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await User.findById(req.user._id);
    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUserId.save();
    }
    res.status(200).json({
      success: true,
      user: currentUser,
      message: "User disliked successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error disliking user",
    });
  }
};
export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "matches",
      "name profilePicture",
    );
    res.status(200).json({
      success: true,
      matches: user.matches,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const users = await User.find({
      $and: [
        {
          _id: { $ne: req.user._id },
        },
        {
          _id: { $nin: currentUser.likes },
        },
        {
          _id: { $nin: currentUser.dislikes },
        },
        {
          _id: { $nin: currentUser.matches },
        },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        {
          genderPreference: { $in: [currentUser.gender, "both"] },
        },
      ],
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profiles",
    });
  }
};
