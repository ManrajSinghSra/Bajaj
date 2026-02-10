
const OFFICIAL_EMAIL = "manraj1323.be23@chitkarauniversity.edu.in";
 

const health=(req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
}
module.exports={health}

