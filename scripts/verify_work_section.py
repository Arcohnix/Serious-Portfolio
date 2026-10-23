import os
import time
from playwright.sync_api import sync_playwright

os.makedirs("acceptance_screenshots", exist_ok=True)

def verify_work_section():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)

        # 1. Desktop 1440x900
        print("\n--- Testing Desktop 1440x900 Selected Work ---")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.goto("http://localhost:3000/#work")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(1.0)

        # Verify #work heading
        heading = page.locator("#work h2").inner_text()
        print(f"Section heading: {heading}")
        assert "selected work" in heading.lower()

        # Verify active navbar item
        active_nav = page.locator("nav[aria-label='Main Navigation'] a[aria-current]").inner_text()
        print(f"Active nav link: {active_nav}")
        assert "Work" in active_nav

        # Capture Desktop Full Section Screenshots
        work_section = page.locator("#work")
        work_section.scroll_into_view_if_needed()
        time.sleep(0.5)
        page.screenshot(path="acceptance_screenshots/work_desktop_hero_to_work.png")

        # Scroll to featured project 01
        p1 = page.locator("#work article:has-text('Resilient Order Processing System')")
        p1.scroll_into_view_if_needed()
        time.sleep(0.5)
        page.screenshot(path="acceptance_screenshots/work_featured_01.png")

        # Scroll to featured project 02
        p2 = page.locator("#work article:has-text('Agentic Security Operations Center')")
        p2.scroll_into_view_if_needed()
        time.sleep(0.5)
        page.screenshot(path="acceptance_screenshots/work_featured_02.png")

        # Scroll to featured project 03
        p3 = page.locator("#work article:has-text('AI Knowledge System')")
        p3.scroll_into_view_if_needed()
        time.sleep(0.5)
        page.screenshot(path="acceptance_screenshots/work_featured_03.png")

        # Scroll to Text-to-SQL project
        sec = page.locator("#work article:has-text('Text-to-SQL Engine')")
        sec.scroll_into_view_if_needed()
        time.sleep(0.5)
        page.screenshot(path="acceptance_screenshots/work_text_to_sql.png")

        # Test Hover Interaction on Featured 01
        p1.hover()
        time.sleep(0.3)
        page.screenshot(path="acceptance_screenshots/work_hover_interaction.png")

        # Verify Links to case studies
        case_study_link = p1.locator("a:has-text('View Case Study')").first
        href = case_study_link.get_attribute("href")
        print(f"Project 01 href: {href}")
        assert href == "/projects/resilient-order-processing"

        # Verify 'View all projects' link
        view_all = page.locator("#work a:has-text('View all projects')")
        assert view_all.count() > 0
        print(f"View all projects href: {view_all.get_attribute('href')}")

        context.close()

        # 2. Tablet 1024x768
        print("\n--- Testing Tablet 1024x768 ---")
        t_context = browser.new_context(viewport={"width": 1024, "height": 768})
        t_page = t_context.new_page()
        t_page.goto("http://localhost:3000/#work")
        t_page.wait_for_load_state("domcontentloaded")
        time.sleep(1.0)
        t_page.screenshot(path="acceptance_screenshots/work_tablet_1024.png")
        t_context.close()

        # 3. Mobile 390x844
        print("\n--- Testing Mobile 390x844 ---")
        m_context = browser.new_context(viewport={"width": 390, "height": 844})
        m_page = m_context.new_page()
        m_page.goto("http://localhost:3000/#work")
        m_page.wait_for_load_state("domcontentloaded")
        time.sleep(1.0)
        m_page.screenshot(path="acceptance_screenshots/work_mobile_390.png")

        # Scroll to Text-to-SQL project on mobile
        m_sec = m_page.locator("#work article:has-text('Text-to-SQL Engine')")
        m_sec.scroll_into_view_if_needed()
        time.sleep(0.5)
        m_page.screenshot(path="acceptance_screenshots/work_mobile_text_to_sql.png")
        m_context.close()

        # 4. Test clicking case study leads to valid route
        print("\n--- Testing Route Navigation to Case Study ---")
        c_page = browser.new_page()
        c_page.goto("http://localhost:3000/projects/resilient-order-processing")
        c_page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        c_title = c_page.locator("h1").inner_text()
        print(f"Case study title on /projects/resilient-order-processing: {c_title}")
        assert "Resilient Order Processing System" in c_title

        # Test /projects archive
        c_page.goto("http://localhost:3000/projects")
        c_page.wait_for_load_state("domcontentloaded")
        time.sleep(0.5)
        archive_title = c_page.locator("h1").inner_text()
        print(f"Archive title on /projects: {archive_title}")
        assert "All Projects" in archive_title

        browser.close()
        print("\n==========================================")
        print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!")
        print("==========================================")

if __name__ == "__main__":
    verify_work_section()
