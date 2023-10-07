import { Body, Container, Widget, Description } from "../ui";
import { AddLink, ShopLIst } from "../../components";

const CreateLinkPage = ({}) => {
  return (
    <Body>
      <Container>
      <ShopLIst />
        
        <Description>
          <div>
            <div>
              <h3>Додаткова інформація</h3>
              <p>
                Це меню створене для допомоги у додаванні нових
                посилань(товарів), тут ви можете побачити список магазинів, які
                підтримууються додатком( в майбутньому буде більше), тому ми
                також залишаємо прямі посилання на магазини
              </p>
            </div>
          </div>
        </Description>
        <AddLink />
      </Container>
    </Body>
  );
};

export default CreateLinkPage;
