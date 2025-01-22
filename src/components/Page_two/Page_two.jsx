import { useQuery} from "@tanstack/react-query";
import { ItemFilter } from "../itemFilter";
import {Link} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import "./Page_two.css";
import Loader from "../loader";

export default function Page_two() {
  const [targetId, setTargetId] = useState("page_1");
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [descId, setDescId] = useState("");
  const [itemDetails, setItemDetails] = useState(null);
  const [sortOrder, setSortOrder] = useState("default_sort"); 
  const { isLoading, data } = useQuery({
    queryKey: ["class", { targetId, search, descId, sortOrder }],
    queryFn: async () => {
      const url = new URL(
        "https://6754592136bcd1eec850e8da.mockapi.io/api/attracs"
      );
      if (targetId !== "all") {
        url.searchParams.append("class", targetId);
      }
      if (targetId === "all") {
        url.searchParams.append("class", currentPage);
      }
      if (search) {
        url.searchParams.append("name", search);
      }
      if (descId) {
        url.searchParams.append("id", descId);
      }
      if (sortOrder !== "default_sort") {
        url.searchParams.append("sortBy", sortOrder); // Добавляем параметр сортировки
      }
      
      const response = await fetch(url.toString());
      return response.json();
    }
  });

  const { isLoading: isLoadingDetails, data: detailsData } = useQuery({
    queryKey: ["itemDetails", descId],
    queryFn: async () => {
      if (!descId) return null;
      const response = await fetch(
        `https://6754592136bcd1eec850e8da.mockapi.io/api/attracs/${descId}`
      );
      return response.json();
    },
    enabled: !!descId
  });

  
  useEffect(() => {
    if (!isLoading && data) {
      setCards(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (detailsData) {
      setItemDetails(detailsData);
    }
  }, [detailsData]);

  const searching = event => {
    setSearch(event.target.value);
  };

  const descripitons = id => {
    setDescId(id);
  };

  const paginationHandler = pageNumber => {
    setCurrentPage(pageNumber);
    setTargetId(`page_${pageNumber}`);
  };

  const filtration = event => {
    setTargetId(event.target.dataset.id);
  };
  const handleSortChange = event => {
    setSortOrder(event.target.value); 
  };
  
  const itemFilterList = [
    { data_id: "all", text: "Все", func: filtration },
    { data_id: "obshestv", text: "Общественные места", func: filtration },
    { data_id: "legend", text: "Легенда", func: filtration },
    { data_id: "mechet", text: "Мечеть", func: filtration },
    { data_id: "muzei", text: "Музей", func: filtration }
  ];

  const BtnList = [
    { text: "1", btn_class: "btn_one", func: () => paginationHandler(1) },
    { text: "2", btn_class: "btn_two", func: () => paginationHandler(2) },
    { text: "3", btn_class: "btn_three", func: () => paginationHandler(3) }
  ];

  return (
    <>
      <section id="page_two">
        <div className="container">
          <div className="page_two_inputs_wrapp">
            <ul className="filtration_ul">
              {itemFilterList.map(item => (
                <ItemFilter
                  data_id={item.data_id}
                  text={item.text}
                  func={item.func}
                  key={item.data_id}
                />
              ))}
            </ul>
            <div className="serching_div">
              <label htmlFor="search" className="search__label">
                Поиск:
              </label>
              <input
                type="search"
                placeholder="Введите название..."
                className="search"
                onChange={searching}
              />
            </div>
          </div>
          <label htmlFor="sorter">Сортировать: </label>
          <select name="sorter" id="sorter" onChange={handleSortChange}>
            <option value="default_sort">без сортировки</option>
            <option value="name">По названию</option>
          </select>
          <div className="page_two_wrap">
            <div className="page_two_wrapper">
              <div className="cards">
                {isLoading ? (
                <Loader />
                ) : data?.length ? (
                  cards.map(item => (
                    <div
                      key={item.id}
                      className={item.class}
                      onClick={() => descripitons(item.id)}
                    >
                      <h1 className="card_title">{item.name}</h1>
                      <a href='#descriptions'>
                        <img src={item.img} alt="" className="page_two_img" />
                      </a  >
                    </div>
                  ))
                ) : (
                  "Not found"
                )}
              </div>
              <div className="pagination_div">
                {BtnList.map(btn_item => (
                  <button
                    key={btn_item.btn_class}
                    className={`${btn_item.btn_class} ${
                      currentPage === parseInt(btn_item.text) ? "active" : ""
                    }`}
                    onClick={btn_item.func}
                  >
                    {btn_item.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="back_div">
              <Link to="/home">
                <button className="back">Назад</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div id="descriptions">
        <div className="descriptions_wrap">
          {isLoadingDetails ? (
          <Loader />
          ) : itemDetails ? (
            <>
            <div>
              <h2>{itemDetails.name}</h2>
              <img src={itemDetails.img} alt={itemDetails.name} className="description_img"/>
              <p>{itemDetails.info}</p>{" "}
            </div>
            <div class="container">
            <div class="back_div">
                <Link to="/home"><button class="back">Назад</button></Link>
            </div>
        </div>
            </>
          ) : (
            <p>Выберите элемент для просмотра деталей.</p>
          )}
          </div>
        </div>
    </>
  );
}
