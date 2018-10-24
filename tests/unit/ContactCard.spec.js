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
  /** @type {import('@vue/test-utils').Wrapper<ContactCard>} */
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ContactCard, {
      propsData: { contact },
      localVue
    });
  });

  it("renders fullname", () => {
    expect(wrapper.find(".card-title").text()).toBe("Jean Dupont");
  });

  it("renders gender", () => {
    expect(wrapper.find(".card-text").text()).toMatch("Gender: Male");
  });

  it("is in non-editing mode by default", () => {
    expect(wrapper.find("form").exists()).toBe(false);
    expect(wrapper.find("input").exists()).toBe(false);
  });

  it("displays a form in editing mode", () => {
    wrapper.find("[data-test-id=edit]").trigger("click");
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("emits an update object on save", () => {
    wrapper.find("[data-test-id=edit]").trigger("click");
    wrapper.find("input").setValue("Jacques");
    wrapper.find("select").setValue("Female");
    wrapper.find("form").trigger("submit");
    expect(wrapper.emitted("update:contact")).toEqual([
      [{ ...contact, firstName: "Jacques", gender: "Female" }]
    ]);
  });

  it("does not modify the original contact prop object", () => {
    const original = { ...contact };
    wrapper.find("[data-test-id=edit]").trigger("click");
    wrapper.find("input").setValue("Jacques");
    wrapper.find("select").setValue("Female");

    expect(contact).toEqual(original);
    expect(wrapper.emitted("update:contact")).toBe(undefined);
  });

  it("does not emit when canceling", () => {
    wrapper.find("[data-test-id=edit]").trigger("click");
    wrapper.find("input").setValue("Jacques");
    wrapper.find("[data-test-id=cancel]").trigger("click");

    expect(wrapper.emitted("update:contact")).toBe(undefined);
  });
});
