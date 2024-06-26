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
    blog_image: {
        type: String,
        required: true,
    },

    date_created: {
        type: String,
        
    },

    created_by: {
        type: String,
        required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);


export default Blog;

