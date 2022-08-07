
import styles from "../styles/Institution.module.css";

const instituicoes = () => {

  const List=[{
    name: "Instituto Federal de Andrelândia",
    presentation: "Conhecido por sua estrutura psicodélica, o IF de Andrelândia conta com mais de 9 cursos na área de engenharia",
    city: "Andrelândia.",
    neighborhood: "Alto do Paraibuna",
    website: "https://www.ifsudestea.edu.br",
    instagram: "https://www.instagram.com/ifsuda",
    facebook : "https://www.facebook.com/ifsudestea",
    whatsapp: "https://api.whatsapp.com/send?phone=5532990909080",
  },{
    name: "Instituto Federal de Valença",
    presentation: "Situado em uma das cidades mais bonitas de Minas Gerais, o IF de Valença está entre os 100 melhores universidades federais do Brasil",
    city: "Valença.",
    neighborhood: "Vale das Capivaras",
    website: "www.ifsudestefv.edu.br",
    instagram: "https://www.instagram.com/ifsudv",
    facebook : "https://www.facebook.com/ifsudestefv",
    whatsapp: "https://api.whatsapp.com/send?phone=5532990909070",
  }, 
  {
    name: "Instituto Federal de Petrópolis",
    presentation: "Situado na cidade imperial, o IF de Petrópolis carrega consigo o avanço tecnológico propagado em seus cursos e o apego a cultura clássica do município",
    city: "Petrópolis.",
    neighborhood: "Reino dos Anões",
    website: "https://www.ifsudestep.edu.br",
    instagram: "https://www.instagram.com/ifsudp",
    facebook : "https://www.facebook.com/ifsudestep",
    whatsapp: "https://api.whatsapp.com/send?phone=5532990909060",
  }, 
  {
    name: "Instituto Federal de Porto Real",
    presentation: "Conhecido por seus festivais tecnológico, o IF de Porto Real se destaca na produção de raspberrys",
    city: "Porto Real.",
    neighborhood: "Tão Tão Distante",
    website: "https://www.ifsudestepr.edu.br",
    instagram: "https://www.instagram.com/ifsudpr",
    facebook : "https://www.facebook.com/ifsudestepr",
    whatsapp: "https://api.whatsapp.com/send?phone=5532990909050",
  }, 
  {
    name: "Instituto Federal de Magé",
    presentation: "O IF de Magé fica ao lado da cidade do Rio de Janeiro e tem seus cursos destinados ao desenvolvimento agropecuário",
    city: "Magé.",
    neighborhood: "Orlando Cruz",
    website: "https://www.ifsudestem.edu.br",
    instagram: "https://www.instagram.com/ifsudm",
    facebook : "https://www.facebook.com/ifsudestem",
    whatsapp: "https://api.whatsapp.com/send?phone=5532990909090",
  }, ]

  return (
    <>
      <h1>Instituições Parceiras:</h1>
      <div id={styles["container"]}>
        {List.map((institution, index) => (
          <div id={styles["cards"]} key={index}>
            <h3>{institution.name}</h3>
            Bairro {institution.neighborhood}, {institution.city}
            <p>{institution.presentation}</p>
            <p>Contato:</p>
            <a href={institution.website}>Website</a>
            <br />
            <a href={institution.facebook}>Facebook</a>
            <br />
            <a href={institution.whatsapp}>Whatsapp</a>
            <br />
            <a href={institution.instagram}>Instagram</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default instituicoes;
