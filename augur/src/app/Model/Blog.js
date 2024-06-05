import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
  {
    username: {
      type: String,
      
    },
    blog_title: {
        type: String,
        required: true,
    },
    blog_body: {
        type: String,
        required: true,
    },

    date_created: {
        type: String,
      
    },
  },

  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
