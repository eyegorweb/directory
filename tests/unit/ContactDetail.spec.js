import { shallowMount } from "@vue/test-utils";
import ContactDetail from "@/views/ContactDetail.vue";

jest.mock("@/api/contacts.js");

const tick = () => new Promise(resolve => process.nextTick(resolve));

describe("ContactDetail.vue", () => {
  it("renders props.msg when passed", async () => {
    const wrapper = shallowMount(ContactDetail, {
      propsData: { id: "1" }
    });
    expect(wrapper.vm.contact).toBe(null);
    await tick();
    expect(wrapper.vm.contact).toEqual({
      id: "1",
      firstName: "Eduardo"
    });
  });
});
