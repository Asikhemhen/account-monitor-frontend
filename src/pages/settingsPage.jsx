import Visible from "../components/visibleToUsers";
import Hidden from "../components/hiddenFromUsers";

const SettingsPage = () => {
  return (
    <section className="flex flex-col gap-28 pt-4 px-5 mt-28 ml-20 pb-16">
      <Visible />
      <Hidden />
    </section>
  );
};

export default SettingsPage;
