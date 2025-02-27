import { Header } from "../../../UI/Header";
import { ListItem } from "../../../UI/ListItem";

export default function Home() {
  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header>
       <div className="mb-2">
        <h1 className="text-white 
        text-3xl
        font-semibold">Welcome back!</h1>
        <div className="
        grid
        grid-col-1
        sm:grid-col-2
        xl:grid-col-3
        2xl:grid-col-4
        gap-3
        mt-4

        ">
            <ListItem
            image=''
            name=''
            href=''
            />
        </div>
       </div>
      </Header>
    </div>
  );
}
