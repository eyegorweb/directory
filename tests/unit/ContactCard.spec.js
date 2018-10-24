import { mount, createLocalVue } from "@vue/test-utils";
import ContactCard from "@/components/ContactCard.vue";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const contact = {
  id: 1,
  firstName: "Jean",
  lastName: "Dupont",
  email: "jdp@google.com",
  gender: "Male",
  avatar: "avatar",
  registeredAt: "2014-09-29",
  isFavorite: false
};

describe("ContactCard.vue", () => {
  it("renders fullname", () => {
    const wrapper = mount(ContactCard, {
      propsData: { contact },
      localVue
    });
    expect(wrapper.find(".card-title").text()).toBe("Jean Dupont");
  });
});
