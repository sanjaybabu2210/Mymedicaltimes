var mongoose=require("mongoose");

var articleSchema=new mongoose.Schema({
    title:String,
    shortDescription:String,
    description:String,
    mainHeading:{
        type:String,
        default:"news"
    },
    subHeading:{
        type:String,
        default:"news"
    },
    coverImage:{
        type: String,
                default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8QDQ0PEg0QEA8OEBANDQ4OEg8PDRAQFREXFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNyg5OisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALMBGQMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAMBAgUH/8QAKxABAAIAAggGAwEBAAAAAAAAAAECBBEDEyExQVFScRQyYZGhsRKBwSLR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP2sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHm14jfOTG2LjhGfwChy0xG+cu6K+JtPHLsymc+PuC22JrHr2YXxU8Iy+WNazO6G1MNafTuDOdJOcTMzsfQic3zbRlMxyW4W2de2wGwAAAAAAAAAAAAAAAAAAAAAAJL4qeEe4K2d9NWOP63or6S075l4BVbF8o92V9PaePs5TQ2ndHvsa1wnOfYEz1TRzO6M11dDWOH7na0BHTCTxnLttbUw9Y4Z92wDkRk6AIcXXK2fPa9YO22Y5tMXX/ADnyS6O2Von1B9IcdAAAAAAAAAAAAAAAAAAAAAQYmuVp9dq9LjK7p/QM8PSLTMTyzhZTR1jdEIdBbK0T+n0AGWl08VnLKeezJqjxnmjsDTxccp+DxUcp+EtazO6M3rU26ZBR4qOU/B4qOU/CfU26ZNTbpkFHio5T8Hio5T8J9Tbpk1NumQbXxNZiYynbHolaam3TJqbdMg2pioiIiYnZs4PXio5T8JtTbpl3U26ZBR4qOU/D1TERMxGU7eyO1JjfEw94bzwC8AAAAAAAAAAAAAAAAABnpq51mGgD5b6OitnWJ5wh0tcrTHsowdtkxyBSjxnmjssR4zzR2AwW+e39WI8Fvnt/VgPNrxG+cnKaSs7pz+0eInO8+myHiszEwD6QAA82tEb5egAATY3dXvLHDeerbG7q95Y4bz1BeAAAAAAAAAAAAAAAAAAACTGV2xPPZLPDWyvHrsVYmudJ9NqGJ4g+mjxnmjsqpbOInnGaXGeaOwGC3z2/qxHgt89v6sBhp8P+U5xO3jnueNFhcpzmd3CFTze8RGcg9CHxFvy/L49HvT6fOIiOO/8A4DxiNL+U+kbm+F0mcZcY+kT1S2U5g+kPNLZxE83oE2N3V7yxw3nq2xu6veWOG89QXgAAAAAAAAAAAAAAAAAAA5MPm3jKZjlOT6aLF1ytnzgG2Ev/AJy5fTHFWibbJ4MAFGC3z2/qxHgt89v6sBy0xETM7oQabSzafThDfEUvacoiPxjdt3yy8NblHuDEbeGtyj3PDW5R7gxG3hrco9zw1uUe4O4bS5Tlwn4lah8NblHur0X5Zbd4Mcbur3ljhvPVtjd1e8scN56gvAAAAAAAAAAAAAAAAAAAAZafRflEcNrUBhTC1jfnPwwxVYi0ZRlsXI8Z5o7A5hbxEznOWxTr6dX2gAX6+nV9mvp1faABfr6dX2a+nV9oAF+vp1fZr6dX2gAX6+nV9ua+nV9oQG+K0kTEZTnteMN56s2mG88AvAAAAAAAAAAAAAAAAAAAAAAcdAcHQHB0BwdAcHQHB0BwdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"

    },
    userId:{
        type:String,
        default:"admin"
    },
    isfeatured:{
        type:Boolean,
        default:false
    },
    username:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    disease:{
        type:String,
        default:null
    },
    author:String
});

module.exports=mongoose.model("article",articleSchema);