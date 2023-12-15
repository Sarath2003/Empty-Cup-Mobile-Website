const toggleCompanyShortlist = (id) => {
  const companyEl = document.getElementById(`company-${id}`);
  const shortlistIconEl = document.getElementById(`shortlist-icon-${id}`);
  companyEl.classList.toggle("shortlisted-company");
  shortlistIconEl.src = companyEl.classList.contains("shortlisted-company")
    ? "images/shortlisted.svg"
    : "images/shortlist.svg";
};

const toggleDisplayShortlisting = () => {
  const companiesEl = document.getElementById("companies");
  companiesEl.classList.toggle("shortlisted-companies");
};

const getCompaniesData = async () => {
  const response = await fetch(
    "https://rest-api-emptycup.onrender.com/company"
  );
  const data = await response.json();
  return data;
};

const getRatingHtml = (rating) => {
  let ratingHtml = "";
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) ratingHtml += `<i class="fa-solid fa-star"></i>`;
    else if (rating > 0)
      ratingHtml += `<i class="fa-regular fa-star-half-stroke"></i>`;
    else ratingHtml += `<i class="fa-regular fa-star"></i>`;

    rating--;
  }
  return ratingHtml;
};

const getCompaniesHTML = async (companies) => {
  const companyHtmlPromises = companies.map(async (company) => {
    const {
      id,
      name,
      rating,
      about,
      projects,
      experience,
      price,
      contact1,
      contact2,
    } = company;
    const ratingHtml = await getRatingHtml(rating);
    return `
        <section id="company-${id}">
            <div class="about">
                <h3>${name}</h3>
                <div class="rating">${ratingHtml}</div>
                <p>${about}</p>
                <div class="data">
                    <p><span>${projects}</span>Projects</p>
                    <p><span>${experience}</span>Years</p>
                    <p><span>${price}$</span>Price</p>
                </div>
                <div class="contacts">
                    <p>+91 - ${contact1}</p>
                    <p>+91 - ${contact2}</p>
                </div>
            </div>
            <div class="features">
                <ul>
                    <li>
                        <img src="images/details.svg" alt="">
                        <p>Details</p>
                    </li>
                    <li>
                        <img src="images/hide.svg" alt="">
                        <p>Hide</p>
                    </li>
                    <li>
                        <img src="images/shortlist.svg" alt="" class="shortlist-icon" id="shortlist-icon-${id}" data-shortlist="${id}">
                        <p>Shortlist</p>
                    </li>
                    <li>
                        <img src="images/report.svg" alt="">
                        <p>Report</p>
                    </li>
                </ul>
            </div>
        </section>`;
  });

  const companyHtmlArray = await Promise.all(companyHtmlPromises);
  return companyHtmlArray.join("");
};

const getCompanyListing = async () => {
  const companiesData = await getCompaniesData();
  document.getElementById("companies").innerHTML = await getCompaniesHTML(
    companiesData
  );
};

getCompanyListing();

const shortlistButtonEl = document.getElementById("shortlist-feature");
shortlistButtonEl.addEventListener("click", toggleDisplayShortlisting);

document.addEventListener("click", (e) => {
  if (e.target.dataset.shortlist) {
    toggleCompanyShortlist(e.target.dataset.shortlist);
  }
});
