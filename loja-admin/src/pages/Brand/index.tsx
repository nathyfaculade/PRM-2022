import { ColumnActionsMode, IColumn, PanelType, SelectionMode, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { IBrand } from "index";
import { useEffect, useState } from "react";
import { PageToolBar } from "../../components/PageToolBar";
import { listBrands } from "../../services/serve";

export function BrandPage(){

    //Entities
    const[brand,setBrand] = useState<IBrand>({} as IBrand)
    const[brands,setBrands] = useState<IBrand>({} as IBrand)

    //State - mensagens
    const [massageError, setmessageError] = useState('');
    const [massageSuccess, setmassageSuccess] = useState('');

    //State - Carregando
    const [loading, setLoading] = useState(true);

    //State - Abre e fecha form
    const [openPanel, setOpenPanel] = useState(true);

    //Colunas
    const columns: IColumn[]=
    
    {
        key: 'name',
        name: 'Nome da Marca',
        fieldName: 'name',
        minWidth: 100,
        isResizable: false,
        columnActionMode: ColumnActionsMode.disabled
    }

    useEffect{()=> {

        listBrands()
            .then(result => {
                setBrand(result.data);
            )
            .catch(error => {
                setmessageError(error.messagw);
                setInterval(()=>{
                    setmessageError('')
                }, 1000)
            })
            .finally(() => setLoading(false))

    }, []} 

    function handleNew(){
        setBrand({
            name:''
        });

        setOpenPanel(true);
    }

    return (
        <div id="brand-page" className="main-content">
            <Stack horizontal={false}>
                <PageToolBar
                    currentPageTitle="Marcas"
                    loading={loading}
                    onNew={ handleNew }/>

                <MassageBarCuston
                    messageError={massageError}
                    messageSuccess={massageSuccess}
                    onDismiss={handleDemissMassageBar}/>


                <div className="data-list">
                    <ShimmeredDetailsList
                        items={brand}
                        columns={columns}
                        setKey={}
                        enableShimmer={loading}
                        selectionMode={SelectionMode.none}/>
                </div>
            </Stack>

            <Panel 
                className="painel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de Marca"
                isFooterAtBotton={true}
                onDismiss={() => setOpenPanel(false)}>

                <p>Preencha TODOS os campos obrigatorios indentificados po <span className="required">*</span></p>


                <Stack horizontal={false} className="panel-form-contant"
                    <TextField 
                    label="Nome da Marca"
                    required
                    value={brand.name}
                    onChange={event => setBrand({...brand, name:(event.target as HTMLInputElement).value})}


            </Panel>
        </div>
    )
}