
        const apiUrl = "https://restcountries.com/v2/all";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const paises = data;

                const listaBanderas = document.getElementById("listaBanderas");
                
                function buscarPaisPorNombre(query) {
                    listaBanderas.innerHTML = "";
                    const pais = paises.find(pais => 
                        pais.translations.es.toLowerCase() === query.toLowerCase()
                    );

                    if (pais) {
                        if (pais.flags && pais.flags.svg) {
                            const liBandera = document.createElement("li");
                            const banderaImg = document.createElement("img");
                            banderaImg.src = pais.flags.svg;
                            banderaImg.alt = `Bandera de ${pais.translations.es}`;
                            liBandera.appendChild(banderaImg);
                            listaBanderas.appendChild(liBandera);
                        }
                    } else {
                        const liError = document.createElement("li");
                        liError.textContent = "País no encontrado";
                        listaBanderas.appendChild(liError);
                    }
                }
                const busquedaInput = document.getElementById("busquedaInput");

                busquedaInput.addEventListener("input", () => {
                    buscarPaisPorNombre(busquedaInput.value);
                });

                busquedaInput.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                        buscarPaisPorNombre(busquedaInput.value);
                    }
                });
            })
            .catch(error => {
                console.error("Hubo un error al obtener la lista de países:", error);
            });
