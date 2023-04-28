import React from 'react'
import Layout from '../../Components/Layout'
import styles from '../../styles/LearnPage.module.scss'
import Link from 'next/link'

export default function History() {
  return (
    <Layout>
      <div className={styles.header}>
        <img src='/learn/ginger.png' alt='Garlic' />
        <h1>Ingredients in Old Amish Remedies</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.content__imageleft}>
          <img src='/learn/apple.png' alt='Apple Cider Vinegar' />
          <div className={styles.content__imageleft__content}>
            <h2>Unfiltered Raw Apple Cider Vinegar</h2>
            <p>
              Unfiltered raw apple cider vinegar is a potent natural ingredient
              that has been used for centuries for its health benefits. It is
              made by fermenting crushed apples and allowing the natural
              bacteria and yeast to turn the sugars in the apples into acetic
              acid. This process gives apple cider vinegar its strong sour taste
              and potent health properties.
            </p>
            <p>
              The unfiltered version of apple cider vinegar contains a mother,
              which is a cloudy, web-like substance that contains beneficial
              enzymes, proteins, and good bacteria. These elements are
              responsible for the numerous health benefits of apple cider
              vinegar, including improved digestion, weight loss, and blood
              sugar control. The acetic acid in apple cider vinegar is also
              believed to help lower cholesterol levels and blood pressure,
              reducing the risk of heart disease.
            </p>
            <p>
              At Old Amish Remedies Plus, we use unfiltered raw apple cider
              vinegar as one of the main ingredients in all of our products. The
              tonic combines the benefits of apple cider vinegar with ginger and
              garlic to create a natural and effective solution for digestive
              issues and cramp relief.
            </p>
          </div>
        </div>
        <div className={styles.content__imageright}>
          <div className={styles.content__imageright__content}>
            <h2>Juice from the Ginger Plant</h2>
            <p>
              Ginger is a root that has been used for its medicinal properties
              for thousands of years. It has a strong, pungent flavor and is
              commonly used in cooking and teas. The juice from the ginger plant
              contains a compound called gingerol, which has potent
              anti-inflammatory and antioxidant properties.
            </p>
            <p>
              The anti-inflammatory properties of ginger make it an excellent
              natural remedy for muscle pain and soreness. It is also effective
              in reducing inflammation in the digestive tract, making it helpful
              in relieving symptoms of digestive issues like nausea, bloating,
              and gas. Additionally, ginger is known to boost the immune system
              and fight off infections, making it a great natural way to stay
              healthy.
            </p>
            <p>
              We use ginger juice as one of the active ingredients in our Old
              Amish Muscle Tonic and Old Amish Digestion Tonic. This tonic
              combines the benefits of ginger juice with apple cider vinegar and
              garlic juice to create a natural and effective solution for muscle
              pain, soreness and digestive issues.
            </p>
          </div>
          <img src='/learn/ginger-2.png' alt='Ginger' />
        </div>
        <div className={styles.content__imageleft}>
          <img src='/learn/garlic.png' alt='Garlic' />
          <div className={styles.content__imageleft__content}>
            <h2>Natural Garlic Juice</h2>
            <p>
              Garlic is a popular spice used in cooking and has been used for
              medicinal purposes for thousands of years. It contains a compound
              called allicin, which has potent antibacterial and antifungal
              properties. Additionally, garlic is known to lower cholesterol
              levels, reduce blood pressure, and boost the immune system.
            </p>
            <p>
              Garlic juice is a natural remedy for digestive issues like
              bloating, gas, and diarrhea. It is also helpful in reducing
              inflammation in the body, making it an effective remedy for sore
              muscles and joints. Additionally, garlic juice has potent
              antibacterial properties that can help fight off infections.
            </p>
            <p>
              At Old Amish Remedies Plus, we use natural garlic juice as one of
              the active ingredients in all of our products. This tonic combines
              the benefits of garlic juice with apple cider vinegar and ginger
              juice to create a natural and effective solution for digestive
              issues and cramp relief.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
