import express from "express";
import mongoose from "mongoose";
import Question from "../models/questionModel.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { CreateSchema, UserQuestionSchema } from "../JoiModels/CreateSchema.js";
import Comment from "../models/commentModel.js";
import Star from "../models/starModel.js";
const router = express.Router();

const tokenControl = async (req, res, next) => {
  try {
    var token = req.headers.token;

    var decoded = jwt.verify(token, "secret");
    var username = decoded.username;
    const userPassword = await User.find({ username }).select({
      password: 1,
      _id: 0,
    });

    if (userPassword[0].password === decoded.password) {
      next();
    }
  } catch (err) {}
};
router.post("/Create", tokenControl, async (req, res) => {
  try {
    const result = await CreateSchema.validateAsync(req.body);

    const { baslik, yazi, postedBy } = req.body;
    const createdQuestion = await Question.create({
      baslik,
      yazi,
      postedBy,
    });

    return res.status(201).json(createdQuestion);
  } catch (error) {
    return res.status(401).json({ message: "Question create failed", error });
  }
});

router.get("/Q", async (req, res) => {
  try {
    const post = await Question.find({})
      .populate("postedBy", "fullname _id photo username")
      .sort([["start", -1]]);

    if (!post) {
      return res.status(400).json({ message: "post Yok" });
    } else {
      return res.status(200).json({ post });
    }
  } catch (error) {
    return res.json({ message: "giriş başarısız" });
  }
});
router.post("/userQuestions", async (req, res) => {
  try {
    const result = await UserQuestionSchema.validateAsync(req.body);

    const { username } = req.body;
    const userData = await User.find({ username }).select("_id");

    const post = await Question.find({ postedBy: userData });

    if (!post) {
      return res.status(400).json({ message: "post Yok" });
    } else {
      return res.status(200).json({ post });
    }
  } catch (error) {
    return res.json({ message: "giriş başarısız" });
  }
});

router.post("/getQuestion", async (req, res) => {
  try {
    const questionId = req.body.formData.questionId;
    const id = mongoose.Types.ObjectId(questionId);
    parseInt(id.valueOf(), 16);

    const QuestionData = await Question.findOne({ _id: id })
      .populate("postedBy", "fullname _id photo createDate")
      .select({ baslik: 1, yazi: 1, start: 1 });

    return res.status(200).json(QuestionData);
  } catch (error) {
    return res.status(404).json({ message: "Soru getirilemedi." });
  }
});

router.post("/addComment", async (req, res) => {
  try {
    var token = req.headers.token;

    const stringAccesToken = token;
    var decoded = jwt.verify(stringAccesToken, "secret");

    var username = decoded.username;
    var { id, yorum } = req.body;
    id = mongoose.Types.ObjectId(id);
    parseInt(id.valueOf(), 16);

    const userExists = await User.findOne({ username }).select("_id:1");

    const yorumAt = new Comment({
      paylasanId: userExists.id,
      paylasimId: id,
      yorum: yorum,
    });
    yorumAt.save(function (err) {
      if (err) return handleError(err);
    });
    return res.status(200).json();
  } catch (err) {
    res.status(400);
  }
});
router.post("/getComment", async (req, res) => {
  try {
    var paylasimId = req.body.questionId;
    var starBy = req.body.id;
    paylasimId = mongoose.Types.ObjectId(paylasimId);
    parseInt(paylasimId.valueOf(), 16);

    paylasimId = mongoose.Types.ObjectId(paylasimId);
    parseInt(paylasimId.valueOf(), 16);
    const yorumlar = await Comment.find({ paylasimId })
      .populate("paylasanId", "fullname photo createDate")
      .select();

    return res.status(200).json({ yorumlar });
  } catch (err) {
    res.status(400);
  }
});
router.post("/toggleStar", tokenControl, async (req, res) => {
  try {
    var token = req.headers.token;

    var id = req.body.formData;
    const stringAccesToken = token;
    var decoded = jwt.verify(stringAccesToken, "secret");

    var username = decoded.username;

    id = mongoose.Types.ObjectId(id);
    parseInt(id.valueOf(), 16);

    const userExists = await User.findOne({ username }).select("_id:1");

    const starExists = await Star.findOne({
      paylasimId: id,
      starBy: userExists,
    }).select("_id:1");

    if (starExists) {
      const silinen = await Star.findByIdAndDelete(starExists);
    } else {
      const star = new Star({
        paylasimId: id,
        starBy: userExists.id,
      });

      star.save(function (err) {
        if (err) return err;
      });
    }

    return res.status(200).json({ message: "okey" });
  } catch (err) {
    res.status(400);
  }
});

router.post("/getStar", async (req, res) => {
  try {
    var id = req.body.formData;

    id = mongoose.Types.ObjectId(id);
    parseInt(id.valueOf(), 16);

    const starExists = await Star.find({ paylasimId: id })
      .populate("starBy", " username  ")
      .select("_id:1");

    return res.status(200).json(starExists);
  } catch {
    return res.status(400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var id = mongoose.Types.ObjectId(req.params.id);
    parseInt(id.valueOf(), 16);
    const question = Question.find({ _id: id });
    if (question.userId === req.body.userId) {
      await question.deleteOne();

      res.status(200).json("The post deleted succesfully!");
    } else {
      res.status(403).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(400);
  }
});

router.put("/:id", async (req, res) => {
  try {
    var id = mongoose.Types.ObjectId(req.params.id);
    parseInt(id.valueOf(), 16);
    const post = await Question.findById(id);
    let baslik = req.body.data.item.baslik;
    let yazi = req.body.data.item.yazi;
    var token = req.body.data.userId;

    var decoded = jwt.verify(token, "secret");
    var username = decoded.username;

    const userId = await User.find({ username }).select({
      _id: 1,
    });

    if ((post.postedBy === post.postedBy, userId[0]._id)) {
      await post.updateOne({ $set: { baslik, yazi } });

      res.status(200).json("The post has been updated!");
    } else {
      res.status(403).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/myStars/:id", async (req, res) => {
  try {
    var id = mongoose.Types.ObjectId(req.params.id);
    parseInt(id.valueOf(), 16);
    const posts = await Star.find({ starBy: id }).populate(
      "paylasimId",
      " baslik yazi start  "
    );

    res.status(200).json(posts);
  } catch (err) {
    res.status(400);
  }
});
export default router;
