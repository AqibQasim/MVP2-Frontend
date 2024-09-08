import Capsule from "@/components/Capsule";
import ClientSideModal from "@/components/ClientSideModal";
import DashboardSection from "@/components/DashboardSection";
import EntityCard from "@/components/EntityCard";
import Heading from "@/components/Heading";
import Skill from "@/components/Skill";
import { formatCurrencyNoDecimals } from "@/utils/utility";
import IconWithBg from "./IconWithBg";
import ButtonCapsule from "./ButtonCapsule";

const skills = ["python", "javascript", "react"];

function ClientRecommendationCard({ client = {} }) {
  return (
    <DashboardSection
      paragraph={`Hey ${client.name}, here's your new`}
      heading="Recommendations"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <EntityCard
            entity={{
              image: "/avatars/avatar-1.png",
              name: client.name,
              profession: client.website,
            }}
          />
          <div className="capsules inline-flex items-center justify-center gap-[6px]">
            <Capsule>
              <p>exp: {client.name.length}Y </p>
            </Capsule>
            <Capsule>
              <p>full time</p>
            </Capsule>
            <Capsule icon={<IconWithBg icon="$" />}>
              <p className="">{formatCurrencyNoDecimals(2000)}</p>
            </Capsule>
          </div>
        </div>
        <Heading xm> {client.username} </Heading>
        <div className="cto flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            {skills.map((skill) => (
              <Skill key={skill} icon={skill} skill={skill} />
            ))}
            <span className="h-[1px] w-2 rounded-full bg-grey-primary-tint-40"></span>
            <Skill score={8.0} />
          </div>
          {/* ScheduleInterview */}
          <ClientSideModal
            opens="schedule-interview"
            button={<ButtonCapsule>Schedule Interview</ButtonCapsule>}
            window={
              <div className="d">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus itaque fugiat obcaecati placeat fugit, labore provident
                dignissimos eius nam harum quaerat laboriosam esse consectetur
                quisquam voluptas pariatur dicta, fuga nisi! Esse dolorum eum
                autem doloremque numquam aliquam ducimus debitis maxime labore
                ut deleniti voluptatum, dolore quia? Iste deserunt omnis ad
                impedit eligendi, est voluptate nam, molestiae provident iure
                nihil necessitatibus ab exercitationem unde. Voluptatibus
                molestiae qui possimus maiores accusantium asperiores quo ipsa
                sapiente, perspiciatis rerum vitae numquam quis nihil quasi
                suscipit tenetur! Repellat velit quo excepturi optio molestias
                non, pariatur nihil fugiat, consectetur nesciunt facilis ullam
                quos in tenetur dicta? Magnam et eos dolores hic sapiente
                repellendus quo debitis, reiciendis error corrupti. Odio ipsam,
                quibusdam nulla dolores sapiente magni, repudiandae eligendi
                repellat, voluptas eius doloremque illo! Veritatis odio, nam
                temporibus fugit quam provident. Quam aliquid obcaecati quisquam
                placeat ea recusandae amet consectetur quod deserunt? Rerum,
                neque aliquam ipsam facere doloribus nostrum, beatae vero quas
                qui minus obcaecati officia expedita perferendis. Illum
                architecto porro libero cumque pariatur. Eveniet vitae aperiam
                nulla debitis consectetur ab perspiciatis labore tempora vero
                nostrum quidem rem facilis minus, error rerum hic, nesciunt
                corporis? Dolor est, perferendis minus aut quae voluptate iusto
                magnam quis sapiente nihil illo ipsam delectus odio facere,
                praesentium autem libero illum voluptates! Cum, adipisci!
                Adipisci, accusantium? Voluptates vel, nemo sapiente sint odio
                inventore ducimus culpa? Tenetur nobis consequuntur, quas nihil
                assumenda suscipit praesentium eaque harum nisi iusto officia
                repellendus alias molestias temporibus quisquam nesciunt,
                nostrum facere aliquam hic, soluta aperiam delectus similique.
                Velit rerum, doloremque et unde reprehenderit quam minus itaque
                ipsam cumque, quibusdam tempora vero soluta asperiores magnam
                earum sapiente temporibus! Eaque expedita officia excepturi,
                veritatis blanditiis dignissimos cum nostrum aspernatur ipsam
                nobis exercitationem enim, saepe illo repellat itaque dolor
                totam ea, esse non voluptate! Facilis deleniti perspiciatis
                laudantium a, cumque cupiditate totam quos excepturi fuga cum
                consequatur natus libero quo accusantium neque repellendus non
                ut illo doloremque, voluptatem eligendi veritatis et. Commodi
                alias quasi numquam voluptatem incidunt in nostrum quaerat aut
                ut earum. Magnam quia perspiciatis voluptas architecto? Vitae
                libero mollitia aliquam dicta saepe, quod dolorem quo veniam
                rerum ab, minima et magni? Dolor, qui dicta error quas accusamus
                culpa voluptate vitae. Tenetur autem nesciunt nulla qui. Officia
                accusantium ipsam laudantium ullam amet dignissimos eligendi
                reiciendis dolor earum quisquam perspiciatis vitae dolore, dicta
                exercitationem, consectetur ut debitis asperiores fugit eos
                atque dolores blanditiis? Et atque recusandae labore eos id
                tenetur sint! here u can scedule an interviews
              </div>
            }
          />
        </div>
      </div>
    </DashboardSection>
  );
}

export default ClientRecommendationCard;
