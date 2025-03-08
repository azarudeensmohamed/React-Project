import React, { useEffect, useState } from 'react';
// import ReactDOMServer from "react-dom/server";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../layout/sidebar';
import Header from '../../layout/Header';
import Footr from '../../layout/Footr';
import $ from 'jquery';
import 'datatables.net';
import { FadeLoader } from "react-spinners";
import apiClient from '../../Components/apiClient';
import { handleApiRequestGet } from "../../Helper/HelperGetFunction";


export const BlogList = () => {

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const table = $("#table_id").DataTable({
      processing: true,
      serverSide: true,
      iDisplayLength: 8,
      sDom: "lrtip",
      lengthChange: false,
      order: [[0, "desc"]],
      columnDefs: [{ className: "ps-3", targets: "_all" }],
      pagingType: window.innerWidth < 768 ? "full" : "full_numbers",
      ajax: {
        url: `${apiUrl}api/blog-list-data`,
        type: "GET",
        dataType: "json",
        beforeSend: function() {
            $('#table_id').append(<FadeLoader />);
        },
        dataSrc: function (response) {
          return response.data;
        },
      },
      lengthMenu: [8, 25, 50, 100],
      pageLength: 8,
      columns: [
        { data: "id", orderable: false },
        { data: "title", orderable: false },
        { data: "banner_title", orderable: false },
        { data: "status", orderable: false },
        { data: "date", orderable: false },
        {
          data: "action",
          orderable: false,
          render: function (action) {
            return `
              <button class="btn btn-soft-primary btn-icon btn-sm rounded-circle view-btn" data-id="${action}">
                👁️
              </button>
              <button class="btn btn-soft-success btn-icon btn-sm rounded-circle edit-btn" data-id="${action}">
                ✏️
              </button>
              <button class="btn btn-soft-danger btn-icon btn-sm rounded-circle delete-btn" data-id="${action}">
                🗑️
              </button>
            `;
          },
        },
      ],
    });

    $(document).on("click", ".view-btn", function () {
      let id = $(this).data("id");
      alert(`View ID: ${id}`);
    });

    $(document).on("click", ".edit-btn", function () {
      let id = $(this).data("id");
      navigate(`/blogs/${id}`);
    });

    $(document).on("click", ".delete-btn", function () {
        const $btn = $(this);
        const Deleteid = $btn.data("id");

        if (window.confirm("Are you sure you want to delete this Blog?")) {
        const Deleteurl = `blog-delete/${Deleteid}`;

        handleApiRequestGet(
            apiClient,
            Deleteurl,
            (data) => {
            if (data.status === "success") {
                table.row($btn.closest("tr")).remove().draw(false);
            } else {
                console.log("Unexpected response status:", data.message);
            }
            },
            (error) => {
            console.log(error?.response?.data?.message || "Something went wrong");
            }
        );
        }
    });


    $('#search').on('keyup', function () {
        const SearchValue = $(this).val();
        table.column(4).search(SearchValue).draw();
    });

    return () => {
      if ($.fn.DataTable.isDataTable("#table_id")) {
        $("#table_id").DataTable().clear().destroy();
      }
    };
  }, [apiUrl, navigate]);


  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 col-side-bar d-none d-sm-block">
            <Sidebar />
          </div>
          <div className="col-12 col-sm-10 col-bg-color-2 px-2">
            <Header />
            <div className="page-title-blog d-flex align-items-sm-center flex-sm-row flex-column gap-2">
              <div className="flex-grow-1">
                <h4 className="fs-18 fw-semibold mb-0">Blogs List</h4>
              </div>
              <div>
                <input type="text" className='form-control' id="search" placeholder='Search' />
              </div>
            </div>
            <div className="container-fluid">
              <div className="card">
                <div className="table-responsive">
                    <table id="table_id" className="table table-nowrap mb-0" style={{ width: '100%' }}>
                      <thead className="bg-light-subtle">
                        <tr>
                          <th className="ps-3" style={{ width: '50px' }}>
                            S.NO
                          </th>
                          <th>Title</th>
                          <th>Banner Title</th>
                          <th>Status</th>
                          <th>Created Date</th>
                          <th className="text-center" style={{ width: '125px' }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                    </table>
                </div>
              </div>
              <Footr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
