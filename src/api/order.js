import axios from "axios";

export default async function (req, res) {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/orders`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${process.env.API_TOKEN}`,
        },
      },
    );

    if (response.status === 200) {
      // --- Calltouch интеграция ---
      const ct_site_id = process.env.CT_SITE_ID; // добавьте в .env
      const data = req.body.data || {};
      const ct_data = {
        fio: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        phoneNumber: data.phone || "",
        email: data.email || "",
        subject: "Заявка с сайта",
        comment: data.comment || "",
        requestUrl: req.headers.referer || "",
        sessionId: req.body.sessionId || "", // передавайте sessionId с фронта
      };

      // Отправка в Calltouch
      await axios.post(
        `https://api.calltouch.ru/calls-service/RestAPI/requests/${ct_site_id}/register/`,
        ct_data,
        { headers: { "Content-Type": "application/json" } },
      );
      // --- конец Calltouch ---

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
      .send("Ошибка сервера, попробуйте позже или позвоните нам по телефону");
  }
}
