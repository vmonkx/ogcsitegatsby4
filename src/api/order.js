import axios from "axios";

async function registerCalltouch(name, phone, comment, sessionId) {
  try {
    const params = new URLSearchParams({
      fio: name,
      phoneNumber: phone,
      comment: comment,
      subject: "Заявка с сайта",
    });

    if (sessionId && sessionId !== "undefined") {
      params.append("sessionId", sessionId);
    }

    const response = await axios.post(
      `https://api.calltouch.ru/calls-service/RestAPI/requests/${process.env.CT_SITE_ID}/register/`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Calltouch registration error:", error);
  }
}

export default async function (req, res) {
  try {
    // Отправка заявки в основной API

    const { firstName, phone, comment, sessionId } = req.body.data;

    const orderData = {
      data: {
        firstName,
        phone,
        comment,
      },
    };

    const orderResponse = await axios.post(
      `${process.env.API_URL}/api/orders`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${process.env.API_TOKEN}`,
        },
      },
    );

    // Регистрация в Calltouch
    await registerCalltouch(firstName, phone, comment, sessionId);

    if (orderResponse.status === 200) {
      res.status(200).send("Заявка успешно отправлена!");
    } else {
      res
        .status(400)
        .send(
          "Что то пошло не так, попробуйте еще раз или позвоните нам по телефону",
        );
    }
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .send(
        "Что то пошло не так, попробуйте еще раз или позвоните нам по телефону",
      );
  }
}
