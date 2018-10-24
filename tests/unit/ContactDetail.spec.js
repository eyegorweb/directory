import { shallowMount, createLocalVue } from "@vue/test-utils";
import ContactDetail from "@/views/ContactDetail.vue";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock("@/api/contacts.js");

const tick = () => new Promise(resolve => process.nextTick(resolve));

describe("ContactDetail.vue", () => {
  it("renders props.msg when passed", async () => {
    const wrapper = shallowMount(ContactDetail, {
      propsData: { id: "1" },
      localVue
    });
    expect(wrapper.vm.contact).toBe(null);
    await tick();
    expect(wrapper.vm.contact).toEqual({
      id: "1",
      firstName: "Eduardo"
    });
  });
});
