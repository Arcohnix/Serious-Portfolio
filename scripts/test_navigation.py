import time
from playwright.sync_api import sync_playwright

def get_active_nav_label(page):
    active_links = page.locator("nav[aria-label='Main Navigation'] a[aria-current]")
    count = active_links.count()
    if count == 0:
        return None
    return active_links.first.inner_text().strip()

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("\n--- TEST 1: At top of homepage (Hero visible) ---")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        active = get_active_nav_label(page)
        print(f"Active nav item: {active}")
        assert active is None, f"Expected None active at hero, got {active}"
        print("[PASS] TEST 1: No nav item active at top of homepage.")

        print("\n--- TEST 2: Click Work ---")
        work_link = page.locator("nav[aria-label='Main Navigation'] a:has-text('Work')")
        work_link.click()
        time.sleep(1.0) # wait for smooth scroll to settle
        active = get_active_nav_label(page)
        print(f"Active nav item: {active}")
        print(f"Current URL: {page.url}")
        assert active == "Work", f"Expected 'Work' to be active, got {active}"
        assert page.url.endswith("#work"), f"Expected URL to end with #work, got {page.url}"
        print("[PASS] TEST 2: Work becomes active immediately, URL updated to /#work.")

        print("\n--- TEST 3: Scroll to About ---")
        # Scroll to #about
        page.evaluate("document.getElementById('about').scrollIntoView()")
        time.sleep(1.0)
        active = get_active_nav_label(page)
        print(f"Active nav item: {active}")
        assert active == "About", f"Expected 'About' to be active, got {active}"
        print("[PASS] TEST 3: About automatically active when scrolled.")

        print("\n--- TEST 4: Scroll to Writing ---")
        # Scroll to #writing
        page.evaluate("document.getElementById('writing').scrollIntoView()")
        time.sleep(1.0)
        active = get_active_nav_label(page)
        print(f"Active nav item: {active}")
        assert active == "Writing", f"Expected 'Writing' to be active, got {active}"
        print("[PASS] TEST 4: Writing automatically active when scrolled.")

        print("\n--- TEST 5: Click Work again ---")
        work_link.click()
        time.sleep(1.0)
        active = get_active_nav_label(page)
        print(f"Active nav item: {active}")
        assert active == "Work", f"Expected 'Work' to be active, got {active}"
        print("[PASS] TEST 5: Clicking Work again smoothly activates Work.")

        print("\n--- TEST 6: Refresh while URL is /#work ---")
        page.goto("http://localhost:3000/#work")
        page.reload()
        page.wait_for_load_state("domcontentloaded")
        time.sleep(1.0)
        active = get_active_nav_label(page)
        print(f"Active nav item after reload: {active}")
        assert active == "Work", f"Expected 'Work' to remain active after refresh, got {active}"
        print("[PASS] TEST 6: Refresh on /#work preserves Work active state and scroll position.")

        print("\n--- TEST 7: Open /project/agentic-soc ---")
        page.goto("http://localhost:3000/project/agentic-soc")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        active = get_active_nav_label(page)
        print(f"Active nav item on dedicated project page: {active}")
        assert active == "Work", f"Expected 'Work' to be active on project page, got {active}"
        print("[PASS] TEST 7: Work active on dedicated project route.")

        print("\n--- TEST 8: Open /about ---")
        page.goto("http://localhost:3000/about")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        active = get_active_nav_label(page)
        print(f"Active nav item on /about: {active}")
        assert active == "About", f"Expected 'About' to be active on /about, got {active}"
        print("[PASS] TEST 8: About active on dedicated /about route.")

        print("\n--- TEST 9: Open /writing ---")
        page.goto("http://localhost:3000/writing")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        active = get_active_nav_label(page)
        print(f"Active nav item on /writing: {active}")
        assert active == "Writing", f"Expected 'Writing' to be active on /writing, got {active}"
        print("[PASS] TEST 9: Writing active on dedicated /writing route.")

        print("\n--- TEST 10: Browser Back / Forward ---")
        page.goto("http://localhost:3000")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        page.locator("nav[aria-label='Main Navigation'] a:has-text('Work')").click()
        time.sleep(1.0)
        page.locator("nav[aria-label='Main Navigation'] a:has-text('About')").click()
        time.sleep(1.0)
        assert get_active_nav_label(page) == "About"

        print("Pressing browser Back...")
        page.go_back()
        time.sleep(1.0)
        active = get_active_nav_label(page)
        print(f"Active nav item after Back: {active}")
        assert active == "Work", f"Expected 'Work' after going back, got {active}"

        print("Pressing browser Forward...")
        page.go_forward()
        time.sleep(1.0)
        active = get_active_nav_label(page)
        print(f"Active nav item after Forward: {active}")
        assert active == "About", f"Expected 'About' after going forward, got {active}"
        print("[PASS] TEST 10: Back/Forward navigation updates active state accurately.")

        context.close()

        print("\n--- TEST 11: Mobile navigation ---")
        m_context = browser.new_context(viewport={"width": 390, "height": 844})
        m_page = m_context.new_page()
        m_page.goto("http://localhost:3000")
        m_page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)

        # Open mobile menu
        menu_button = m_page.locator("button[aria-label='Open navigation menu']")
        menu_button.click()
        time.sleep(0.4)

        # Click Work inside mobile menu
        mobile_work_link = m_page.locator("#mobile-navigation nav a:has-text('Work')").first
        mobile_work_link.click()
        time.sleep(1.0)

        # Verify menu closed
        menu_open = m_page.locator("#mobile-navigation").count() > 0
        print(f"Mobile menu open: {menu_open}")
        assert not menu_open, "Expected mobile menu to close after clicking link"

        # Reopen menu to verify active indicator
        menu_button.click()
        time.sleep(0.4)
        active_mobile = m_page.locator("#mobile-navigation a[aria-current]")
        assert active_mobile.count() > 0, "Expected active link in mobile menu"
        active_text = active_mobile.first.inner_text().strip()
        print(f"Mobile menu active link: {active_text}")
        assert "Work" in active_text, f"Expected Work in mobile menu, got {active_text}"
        print("[PASS] TEST 11: Mobile navigation works and updates active state correctly.")

        m_context.close()
        browser.close()
        print("\n==========================================")
        print("ALL 11 TESTS PASSED SUCCESSFULLY!")
        print("==========================================")

if __name__ == "__main__":
    run_tests()
