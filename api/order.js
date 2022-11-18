const { default: axios } = require("axios");

module.exports = async function (req, res) {
  await axios
    .post(`${process.env.API_URL}/api/orders`, req.body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${process.env.API_TOKEN}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        res.status(200).send("Заявка успешно отправлена!");
      } else {
        res
          .status(400)
          .send(
            "Что то пошло не так, попробуйте еще раз или позвоните нам по телефону"
          );
      }
    })
    .catch((err) => console.log("err", err));
};
