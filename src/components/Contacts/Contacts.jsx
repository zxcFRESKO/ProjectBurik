import React, { useState } from "react";
import "./Contacts.css";

export default function Contacts() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Ваше сообщение отправлено");
    setFormData({ name: "", phone: "", email: "", comment: "" });
    toggleModal();
  };

  return (
    <>
      <div className="container">
        <div className="contacts_title">
          <h1 className="contacts_title_h">Контакты</h1>
          <button onClick={toggleModal} className="open_modal">
            Связаться с нами
          </button>
        </div>
        <div className="contacts_convas">
          <p className="contacts_number">Номер: 89393843707</p>
          <p className="contacts_email">Email: burhonidin2009@gmail.com</p>
          <p className="contacts_tg">TG: @zoldik52</p>
        </div>
      </div>
      {isModalVisible && (
        <div className="modal_wrap">
          <div className="modal">
            <div className="modal_wrapper">
              <div className="close">
                <p className="close_modal" onClick={toggleModal}>
                  &times;
                </p>
              </div>
              <div className="modal_title">
                <h2>Напишите свое предложение или просьбу</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="name_div">
                  <input
                    type="text"
                    className="name input"
                    placeholder="Имя"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="em_and_tel_div">
                  <input
                    type="tel"
                    className="tel input"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="email input"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <textarea
                  name="comment"
                  className="comment"
                  placeholder="Комментарий"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit" className="send input">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
