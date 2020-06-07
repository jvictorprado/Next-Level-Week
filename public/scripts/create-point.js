    function populateStates(){
        const stateSelect = document.querySelector("select[name=uf]");

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (resp) => {return resp.json()})
        .then( (states) => {
            for(const uf of states){
                stateSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`    
            }        
        });
    }

    populateStates();

    function getCities(event){
        const citySelect = document.querySelector("select[name=city]");
        const stateInput = document.querySelector("input[name=state]");

        const ufValue = event.target.value;
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

        const indexOfSelectedState = event.target.selectedIndex;
        stateInput.value = event.target.options[indexOfSelectedState].text;

        citySelect.innerHTML = "<option value>Selecione a cidade</option>"
        citySelect.disabled = true;


        fetch(url)
        .then(res => res.json())
        .then(cities => {
            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
    }

    
    document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)  


    //itens de coleta
    //pegar tds os li's

    const itemsToCollect = document.querySelectorAll(".items-grid li")
    
    for( const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

    /* atualizar o campo escondido com os dados selecionados */
    const collectedItems = document.querySelector("input[name=items]");

    let selectedItems = [];

    function handleSelectedItem(event){
        const itemLi = event.target;

        itemLi.classList.toggle("selected")

        //vai pegar os numeros que tem no id do li
        const itemId = itemLi.dataset.id;


        /* ver se existem itens selecionados
        se sim, pegar eles
        */
        const alreadySelected = selectedItems.findIndex((item) => {
            const itemFound = item == itemId;
            return itemFound;
        })

        /* se ja estiver selecionado, tirar da seleção */
        if(alreadySelected >=0){
            /* o filter tbm retorna bolleando, se for vddr
            ela vai adc o element no novo array
            se for falso, vai tirar o item do array */
            const filteredItems = selectedItems.filter(item => {
                const itemIsDifferent = item!=itemId
                return itemIsDifferent;
            })
            
            selectedItems = filteredItems;
        }else{
            /* se não tiver, adiciona a seleção */
            selectedItems.push(itemId);
        }
        /* atualizar o campo escondido com os dados selecionados */
        collectedItems.value = selectedItems;
    }
